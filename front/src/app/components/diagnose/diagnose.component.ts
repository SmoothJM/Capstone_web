import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {DataService} from '../../services/data.service';
import {CustomerModel} from '../../model/customer.model';
import {DoctorService} from '../../services/doctor.service';
import {DoctorModel} from '../../model/doctor.model';
import {Router} from '@angular/router';
import {MessageService} from '../../services/message.service';
import {Message} from '../../model/message.model';

declare var $: any;

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.scss']
})
export class DiagnoseComponent implements OnInit {
  public isDiagnosed: boolean = false;
  public submitted: boolean = false;
  public second: number = 5;
  public uploadForm: FormGroup;
  public diabetesLevel: string;
  public tongueImg: File;
  public customer: CustomerModel = new CustomerModel();
  public doctorsInit: DoctorModel[] = new Array();
  public docsPerPage: number = 5;
  public selectedPage: number = 1;


  constructor(private fb: FormBuilder,
              private userService: UserService,
              private dataService: DataService,
              private doctorService: DoctorService,
              private router: Router,
              private messageService: MessageService) {
  }


  bindDoctor(docEmail: string) {
    this.customer.docEmail = docEmail;
    this.dataService.updateCustomer(this.customer).subscribe(data => {
      this.messageService.reportMessage(new Message(''));
      // this.router.navigateByUrl('/main/diagnose');
    });
  }


  uploadSubmit() {
    // const customerName = this.uploadForm.controls.customerName.value;
    const fd = new FormData();
    fd.append('tongueImg', this.tongueImg);
    // console.log(fd.get('tongueImg'));
    // this.submitted = true;
    // setInterval(() => {
    //   this.second -= 1;
    // }, 1000);

    this.dataService.uploadTongueImg(fd).subscribe(data => {
      console.log(data);
      const flag: boolean = data.flag;
      if (flag) {
        this.diabetesLevel = data.result;
      } else {
        alert(data.result);
      }
    });
  }

  changeImg(event) {
    this.tongueImg = event.target.files[0] as File;
    // console.log(this.tongueImg);
  }

  get doctors(): DoctorModel[] {
    let pageIndex = (this.selectedPage - 1) * this.docsPerPage;
    return this.doctorsInit.slice(pageIndex, pageIndex + this.docsPerPage);
  }

  addClickEvent() {
    setTimeout(() => {
      $('.faq .question').on('click', function() {
        $(this).parents('.panel').toggleClass('open').siblings().removeClass('open');
        $(this).siblings('.answer').slideToggle(300);
        $(this).parents('.panel').siblings().find('.answer').slideUp(300);
      });
    }, 100);
  }
  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.addClickEvent();
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.doctorsInit.length / this.docsPerPage)).fill(0)
      .map((x, i) => i + 1);
  }

  ngOnInit() {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctorsInit = data['doctors'];
    });
    this.addClickEvent();

    this.uploadForm = this.fb.group({
      customerName: [''],
      tongueImg: ['']
    });

    this.dataService.getCustomer().subscribe(data => {
      this.customer = data;
      if (!this.customer.docEmail) {
        this.messageService.reportMessage(new Message('Before diagnose, please select a doctor as your' +
          ' personal doctor. Your diagnose report can only be viewed by the doctor you selected.', false));
      }

    });
  }


}
