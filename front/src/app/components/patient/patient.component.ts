import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {DataService} from '../../services/data.service';
import {LoginModel} from '../../model/login.model';
import {Diagnose} from '../../model/diagnose.model';
import {CustomerModel} from '../../model/customer.model';
import {FormControl} from '@angular/forms';
import {ForwardService} from '../../services/forward.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public doctor: LoginModel = new LoginModel();
  public originSide: Diagnose[] = [];
  public matchSide: Diagnose[] = [];
  public selectedCus: CustomerModel = new CustomerModel();
  public selectedDia: Diagnose = new Diagnose();
  public selectedDias: Diagnose[] = [];
  public origin = [];
  public emptyCus: boolean = false;
  public emptyDia: boolean = false;
  public wholeImg = 'http://127.0.0.1:3000/customer/tongue/';
  public boxImg = this.wholeImg + 'result_box/';
  public searchValue = new FormControl('');

  constructor(private doctorService: DoctorService,
              private dataService: DataService,
              private forwardService: ForwardService,
              private router: Router) {
  }

  ngOnInit() {
    let set = new Set();
    this.dataService.getSession().subscribe(data => {
      this.doctor = data;
      this.doctorService.getDiagnosesByDocEmail(this.doctor.email).subscribe(data => {
        data.forEach(ele => {
          this.origin.push(ele.cusDia); //origin stores all diagnoses of a customer who bound this doctor
          set.add(ele.cusDia.email);
        });
        for (let ele of set) {
          for (let e of this.origin) {
            if (e.email == ele) { // originSide stores those customers who bound the doctor
              this.originSide.push({email: ele, username: e.username});
              break;
            }
          }
        }
        this.matchSide = this.originSide;
        if (this.originSide.length <= 0) {
          this.emptyCus = true;
        }
      });
    });
  }

  toMessage(e: CustomerModel) {
    this.forwardService.sc = e;
    this.router.navigateByUrl('/doctor/chat');
  }

  selectCustomer(email: string) {
    // this.changePage(1);
    this.dataService.getCustomerByEmail(email).subscribe(data => {
      this.selectedCus = data;
      this.selectedDias = [];
      this.origin.forEach(ele => {
        if (ele.email == email) {
          this.selectedDias.push(ele);
        }
      });
      this.selectedDias = this.selectedDias.slice(0, 5);
    });
  }

  selectDiagnose(d: Diagnose) {
    this.selectedDia = d;
  }

  ifEnter(e: any) {
    if (e.which == 13) {
      this.search();
    }
  }

  search() {
    if (this.searchValue.value) {
      this.matchSide = [];
      let msg = this.searchValue.value.trim().replace(/^\s+|\s+$/g, '');
      let reg = new RegExp(msg, 'i');
      this.originSide.forEach(ele => {
        if (reg.test(ele.username)) {
          this.matchSide.push(ele);
        }
      });
    } else {
      this.matchSide = this.originSide;
    }
  }

  // changePage(newPage: number) {
  //   this.selectedPage = newPage;
  // }
  //
  // get pageNumbers(): number[] {
  //   return Array(Math.ceil(this.selectedDias.length / this.diagnosesPerPage)).fill(0)
  //     .map((x, i) => i + 1);
  // }
  //
  // previousPage() {
  //   this.changePage(this.selectedPage - 1);
  // }
  //
  // nextPage() {
  //   this.changePage(this.selectedPage + 1);
  // }
  //
  // get dias() {
  //   let pageIndex = (this.selectedPage - 1) * this.diagnosesPerPage;
  //   return this.selectedDias.slice(pageIndex, pageIndex + this.diagnosesPerPage);
  // }
}
