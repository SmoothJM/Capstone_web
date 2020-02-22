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

  constructor(private doctorService: DoctorService,
              private dataService: DataService) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments() {
    this.doctorService.getAppointments().subscribe(data => {
      this.appointments = data;
      // console.log(this.appointments)
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
    this.doctorService.updateAppointmentsStatus(thing).subscribe(data => {
      this.getAppointments();
    });
  }
  deny(id: string) {
    let status = 'Rejected';
    let thing = {id, status};
    this.doctorService.updateAppointmentsStatus(thing).subscribe(data => {
      this.getAppointments();
    });
  }
  complete(id: string) {
    let status = 'Done';
    let thing = {id, status};
    this.doctorService.updateAppointmentsStatus(thing).subscribe(data => {
      this.getAppointments();
    });
  }
}
