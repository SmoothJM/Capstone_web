import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {CustomerModel} from '../../model/customer.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {MessageService} from '../../services/message.service';
import {Message} from '../../model/message.model';
import {DoctorModel} from '../../model/doctor.model';
import {DoctorService} from '../../services/doctor.service';
import {
  NgbDateStruct, NgbCalendar,
  NgbDate, NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public customer: CustomerModel = new CustomerModel();
  public doctor: DoctorModel = new DoctorModel();
  public form: FormGroup;
  public formDoc: FormGroup;
  public role: string = '';
  public schedule = [];
  public schedules = [];
  public hoveredDate: NgbDate;
  public fromDate: NgbDate;
  public toDate: NgbDate;
  public model: NgbDateStruct;

  constructor(private dataService: DataService,
              private fb: FormBuilder,
              private dataPipe: DatePipe,
              private messageService: MessageService,
              private router: Router,
              private doctorService: DoctorService,
              private calendar: NgbCalendar,
              public formatter: NgbDateParserFormatter) {
  }

  updateSchedule() {
    this.schedule = [];
    for (let i = 0; i < this.schedules.length; i += 2) {
      let from = this.schedules[i];
      let to = this.schedules[i + 1];
      this.schedule.push({from: from, to: to});
    }
    this.doctor.schedule = this.schedules;
  }
  removeSchedule(index: number) {
    if (confirm('Are you sure?')) {
      this.schedules.splice(index*2,2);
      this.updateSchedule();
    }
  }

  addSchedule() {
    if(this.fromDate && this.toDate) {
      let jsFrom = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day);
      let jsTo = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day);
      this.schedules.push(jsFrom);
      this.schedules.push(jsTo);
      this.updateSchedule();
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  ngOnInit() {
    this.dataService.getSession().subscribe(data => {
      this.role = data['role'];
      if (this.role == '0') {
        this.dataService.getCustomer().subscribe(d => {
          this.customer = d;
          this.customer.birthday = this.customer.birthday
            .replace(/-/g, '\/').replace(/T.+/, '');
          this.customer.birthday = this.dataPipe.transform(Date.parse(this.customer.birthday), 'yyyy-MM-dd');
        });
      } else {
        this.doctorService.getDoctor(data['email']).subscribe(d => {
          this.doctor = d;
          this.schedules = this.doctor['schedule'];
          this.updateSchedule();
        });
      }
    });

    this.form = this.fb.group({
      email: '',
      username: '',
      birthday: '',
      gender: '',
      desc: '',
    });

    this.formDoc = this.fb.group({
      emailDoc: '',
      usernameDoc: '',
      addrDoc: '',
      genderDoc: '',
      descDoc: '',
      photoDoc: '',
      scheduleDoc: '',
    });

  }

  submit(f: any) {
    this.dataService.updateCustomer(this.customer).subscribe(_ => {
      this.messageService.reportMessage(new Message('The changes have been saved！'));
      this.router.navigateByUrl('/main/overview');
      setTimeout(() => {
        this.messageService.reportMessage(new Message(''));
      }, 800);
    });
  }

  submitDoc(f: any) {
    this.doctorService.updateDoctor(this.doctor).subscribe(_ => {
      this.messageService.reportMessage(new Message('The changes have been saved！'));
      this.router.navigateByUrl('/doctor/overview');
      setTimeout(() => {
        this.messageService.reportMessage(new Message(''));
      }, 800);
    });
  }

}
