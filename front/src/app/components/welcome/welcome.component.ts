import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {DoctorModel} from '../../model/doctor.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public doctors: DoctorModel[];
  public doctors1: DoctorModel[];
  public doctors2: DoctorModel[];
  public doctors3: DoctorModel[];
  public cites = [
    'http://www.cae.cn/cae/html/main/colys/71145511.html',
    'http://www.cae.cn/cae/html/main/colys/71795027.html',
    'https://baike.baidu.com/item/%E6%9D%8E%E6%96%87%E4%BA%AE/24300481#viewPageContent'
  ];

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctorService.getDoctors().subscribe(result => {
      this.doctors = result['doctors'].slice(0,9);
      this.doctors1 = result['doctors'].slice(0,3);
      this.doctors2 = result['doctors'].slice(3,6);
      this.doctors3 = result['doctors'].slice(6,9);
    });

  }

  getDoctors() {

  }
}
