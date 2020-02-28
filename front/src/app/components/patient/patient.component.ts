import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {DataService} from '../../services/data.service';
import {LoginModel} from '../../model/login.model';
import {Diagnose} from '../../model/diagnose.model';
import {CustomerModel} from '../../model/customer.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public doctor: LoginModel = new LoginModel();
  public sideList: Diagnose[] = [];
  public selectedCus: CustomerModel = new CustomerModel();
  public selectedDia: Diagnose = new Diagnose();
  public selectedDias: Diagnose[] = [];
  public origin = [];
  public emptyCus: boolean = false;
  public emptyDia: boolean = false;
  // public diagnosesPerPage: number = 8;
  // public selectedPage: number = 1;
  public wholeImg = 'http://127.0.0.1:3000/customer/tongue/';
  public boxImg = this.wholeImg + 'result_box/';

  constructor(private doctorService: DoctorService,
              private dataService: DataService) {
  }

  ngOnInit() {
    let set = new Set();
    this.dataService.getSession().subscribe(data => {
      this.doctor = data;
      this.doctorService.getDiagnosesByDocEmail(this.doctor.email).subscribe(data => {
        data.forEach(ele => {
          this.origin.push(ele.cusDia);
          set.add(ele.cusDia.email);
        });
        for (let ele of set) {
          for (let e of this.origin) {
            if (e.email == ele) {
              this.sideList.push({email: ele, username: e.username});
              break;
            }
          }
        }
        if(this.sideList.length<=0) this.emptyCus = true;
      });
    });
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
      this.selectedDias = this.selectedDias.slice(0,5);
    });
  }

  selectDiagnose(d: Diagnose) {
    this.selectedDia = d;
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
