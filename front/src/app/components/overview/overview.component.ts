import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {LoginModel} from '../../model/login.model';
import {Diagnose} from '../../model/diagnose.model';
import {DoctorModel} from '../../model/doctor.model';
import {AppointmentModel} from '../../model/appointment.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public user: LoginModel = new LoginModel();
  public diagnoses: Diagnose[] = [];
  public wholeImg = 'http://127.0.0.1:3000/customer/tongue/';
  public boxImg = this.wholeImg + 'result_box/';
  public emptyDiagnose: boolean = false;
  public emptyAppointment: boolean = true;
  public bindDoctor: DoctorModel = new DoctorModel();
  public lastAppointment: AppointmentModel = new AppointmentModel();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSession().subscribe(data => {
      this.user = data;
    });

    this.dataService.getAllDiagnoses().subscribe(data => {
      this.diagnoses = data.slice(0,3);
      if(data.length<1) this.emptyDiagnose = true;
    });

    this.dataService.getCustomer().subscribe(currentCus => {
      this.dataService.getBindDoctor(currentCus.docEmail).subscribe(data => {
        this.bindDoctor = data;
      });
    });

    this.dataService.getLastAppointment().subscribe(data => {
      this.lastAppointment = data;
      if(this.lastAppointment) this.emptyAppointment = false;
    });
  }

}
