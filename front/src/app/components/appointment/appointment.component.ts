import {Component, OnInit, ViewChild} from '@angular/core';
import {DoctorModel} from '../../model/doctor.model';
import {CustomerModel} from '../../model/customer.model';
import {DataService} from '../../services/data.service';
import {DoctorService} from '../../services/doctor.service';
import {NgbDateStruct, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {AppointmentModel} from '../../model/appointment.model';
import {MessageService} from '../../services/message.service';
import {Message} from '../../model/message.model';
import {BadgeService} from '../../services/badge.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  public doctor: DoctorModel = new DoctorModel();
  public customer: CustomerModel = new CustomerModel();
  public appointment: AppointmentModel = new AppointmentModel();
  public displayMonths = 2;
  public navigation = 'none';
  public showWeekNumbers = false;
  public outsideDays = 'hidden';
  public selectTime = {hour: 9, minute: 0};
  public selectDate: NgbDateStruct;
  public schedules = [];
  public date = new Date;
  public today: NgbDateStruct = {
    day: Number(this.date.toLocaleDateString().split('/')[1])+1,
    month: Number(this.date.toLocaleDateString().split('/')[0]),
    year: Number(this.date.toLocaleDateString().split('/')[2])
  };
  public disabledDate;
  public uncompletedAppointment: boolean = false;
  public empty: boolean = false;


  constructor(private dataService: DataService,
              private doctorService: DoctorService,
              private messageService: MessageService,
              private badgeService: BadgeService) {
  }

  ngOnInit() {
    this.dataService.getCustomer().subscribe(data => {
      this.customer = data;
      if (this.customer.docEmail) {
        this.doctorService.getDoctor(this.customer.docEmail).subscribe(doc => {
          this.doctor = doc;
          let schedule = this.doctor.schedule;
          for (let i = 0; i < schedule.length; i += 2) {
            let from = schedule[i];
            let to = schedule[i+1];
            this.schedules.push({from,to});
          }
          this.disabledDate = (date: NgbDate, current: {month: number, year: number}) => this.checkDate(date)
        });
      } else {
        this.empty = true;
      }
    });

    this.dataService.getLastAppointment().subscribe(data => {
      if(data) {
        this.uncompletedAppointment = data.status === 'Waiting' || data.status === 'Accepted';
      }
    });
  }


  checkDate(date?: NgbDate): boolean {
    let flag = false;
    if (this.schedules.length <= 0) return false;
    for (let i = 0; i< this.schedules.length; i += 1) {
      let from = this.schedules[i]['from'].slice(0,10).split('-');
      let to = this.schedules[i]['to'].slice(0,10).split('-');
      let fromDate = new NgbDate(Number(from[0]), Number(from[1]), Number(from[2]));
      let toDate = new NgbDate(Number(to[0]), Number(to[1]), Number(to[2]));
      flag = (date.after(fromDate) && date.before(toDate)) || date.equals(fromDate) || date.equals(toDate);
      if(flag) break;
    }
    return flag;
  }

  confirmAppointment() {
    if(confirm('Are you sure?')) {
      this.uncompletedAppointment = true;
      let finalDate = new Date(this.selectDate.year, this.selectDate.month-1,
        this.selectDate.day, this.selectTime.hour, this.selectTime.minute);
      let now = new Date(Date.now());
      this.appointment.docEmail = this.doctor.email;
      this.appointment.cusEmail = this.customer.email;
      this.appointment.applyDate = now;
      this.appointment.appointmentDate = finalDate;
      this.appointment.status = 'Waiting';
      this.dataService.addAppointment(this.appointment).subscribe(_ => { });
      this.messageService.reportMessage(new Message('New appointment almost done! Waiting for doctor\'s reply'));
      this.badgeService.reportAppBadgeCount(this.badgeService.originAppBadgeCount);
      setTimeout(() => {
        this.messageService.reportMessage(new Message(''));
      }, 3000);
    }
  }

}
