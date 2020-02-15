import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {LoginModel} from '../../model/login.model';
import {Diagnose} from '../../model/diagnose.model';

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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSession().subscribe(data => {
      this.user = data;
    });

    this.dataService.getAllDiagnoses().subscribe(data => {
      this.diagnoses = data.slice(0,3);
      if(this.diagnoses.length<1) this.emptyDiagnose = true;
    });
  }

}
