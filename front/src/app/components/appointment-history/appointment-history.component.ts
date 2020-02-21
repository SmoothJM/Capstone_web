import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {DoctorService} from '../../services/doctor.service';
import {DoctorModel} from '../../model/doctor.model';
import {CustomerModel} from '../../model/customer.model';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {

  public doctor: DoctorModel = new DoctorModel();
  public customer: CustomerModel = new CustomerModel();

  constructor(private dataService: DataService,
              private doctorService: DoctorService) { }

  ngOnInit() {
  }

}
