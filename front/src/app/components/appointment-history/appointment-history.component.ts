import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {DoctorService} from '../../services/doctor.service';
import {DoctorModel} from '../../model/doctor.model';
import {CustomerModel} from '../../model/customer.model';
import {AppointmentModel} from '../../model/appointment.model';
import {BadgeService} from '../../services/badge.service';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {

  public doctor: DoctorModel = new DoctorModel();
  public customer: CustomerModel = new CustomerModel();
  public appointments: AppointmentModel[] = [];
  public empty: boolean = true;
  public appointmentsPerPage: number = 8;
  public selectedPage: number = 1;

  constructor(private dataService: DataService,
              private doctorService: DoctorService,
              private badgeService: BadgeService) {
  }

  ngOnInit() {
    this.badgeService.beAppZero();
    this.badgeService.reportAppBadgeCount(0);
    this.dataService.getAllAppointments().subscribe(data => {
      if (data.length > 0) {
        data.reverse();
        this.appointments = data;
        this.empty = false;
        this.doctorService.getDoctor(this.appointments[0].docEmail).subscribe(bindDoc => {
          this.doctor = bindDoc;
        });
      }
    });


  }
  changePage(newPage: number) {
    this.selectedPage = newPage;
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.appointments.length / this.appointmentsPerPage)).fill(0)
      .map((x, i) => i + 1);
  }
  previousPage() {
    this.changePage(this.selectedPage-1);
  }

  nextPage() {
    this.changePage(this.selectedPage+1);
  }

  get apps() {
    let pageIndex = (this.selectedPage - 1) * this.appointmentsPerPage;
    return this.appointments.slice(pageIndex, pageIndex + this.appointmentsPerPage);
  }
}
