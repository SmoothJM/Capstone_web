import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {AppointmentModel} from '../../model/appointment.model';
import {CustomerModel} from '../../model/customer.model';
import {DataService} from 'src/app/services/data.service';

@Component({
  selector: 'app-appointment-doctor',
  templateUrl: './appointment-doctor.component.html',
  styleUrls: ['./appointment-doctor.component.css']
})
export class AppointmentDoctorComponent implements OnInit {

  public appointments = [];
  public customer: CustomerModel = new CustomerModel();
  public appointmentPerPage: number = 8;
  public selectedPage: number = 1;
  public empty: boolean = true;

  constructor(private doctorService: DoctorService,
              private dataService: DataService) { }

  ngOnInit() {
    this.getAppointments();
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.appointments.length / this.appointmentPerPage)).fill(0)
      .map((x, i) => i + 1);
  }
  previousPage() {
    this.changePage(this.selectedPage-1);
  }

  nextPage() {
    this.changePage(this.selectedPage+1);
  }

  get apps() {
    let pageIndex = (this.selectedPage - 1) * this.appointmentPerPage;
    return this.appointments.slice(pageIndex, pageIndex + this.appointmentPerPage);
  }

  getAppointments() {
    this.doctorService.getAppointments().subscribe(data => {
      this.appointments = [];
      data.forEach((ele, index) => {
        if(ele.status == 'Waiting') this.appointments.push(ele);
      });
      data.forEach((ele, index) => {
        if(ele.status == 'Accepted') this.appointments.push(ele);
      });
      data.forEach((ele, index) => {
        if(ele.status == 'Done' || ele.status == 'Rejected') this.appointments.push(ele);
      });

      if(this.appointments.length<1) this.empty = false;
    });
  }
  getCustomer(email: string) {
    this.dataService.getCustomerByEmail(email).subscribe(data => {
      this.customer = data;
    });
  }

  accept(id: string) {
    let status = 'Accepted';
    let thing = {id, status};
    this.doctorService.updateAppointmentStatus(thing).subscribe(data => {
      this.getAppointments();
    });
  }
  deny(id: string) {
    let status = 'Rejected';
    let thing = {id, status};
    this.doctorService.updateAppointmentStatus(thing).subscribe(data => {
      this.getAppointments();
    });
  }
  complete(id: string) {
    let status = 'Done';
    let thing = {id, status};
    this.doctorService.updateAppointmentStatus(thing).subscribe(data => {
      this.getAppointments();
    });
  }
}
