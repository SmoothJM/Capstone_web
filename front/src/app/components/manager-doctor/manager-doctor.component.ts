import { Component, OnInit } from '@angular/core';
import {DoctorModel} from '../../model/doctor.model';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-manager-doctor',
  templateUrl: './manager-doctor.component.html',
  styleUrls: ['./manager-doctor.component.css']
})
export class ManagerDoctorComponent implements OnInit {

  public doctors: DoctorModel[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllDoctors().subscribe(data => {
      this.doctors = data;
      console.log(this.doctors);
    });
  }

}
