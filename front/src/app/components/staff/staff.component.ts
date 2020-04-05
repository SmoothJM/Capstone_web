import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {DoctorModel} from '../../model/doctor.model';
import {MessageService} from '../../services/message.service';
import {Message} from '../../model/message.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  public doctors: DoctorModel[] = [];
  public topDoctors: DoctorModel[] = [];
  public otherDoctors: DoctorModel[] = [];
  public photoPath: string = 'http://127.0.0.1:3000/doctor/photo/';
  public empty: boolean = true;
  public cites = [
    'http://www.cae.cn/cae/html/main/colys/71145511.html',
    'http://www.cae.cn/cae/html/main/colys/71795027.html',
    'https://baike.baidu.com/item/%E6%9D%8E%E6%96%87%E4%BA%AE/24300481#viewPageContent'
  ];

  constructor(private doctorService: DoctorService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.reportMessage(new Message('All staff information is fake for testing.', true));
    setTimeout(() => {
      this.messageService.reportMessage(new Message(''));
    }, 10000);
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data['doctors'];
      let len = this.doctors.length;
      if(len>=1) this.empty = false;
      this.topDoctors = this.doctors.slice(0,3);
      this.otherDoctors = this.doctors.slice(3);
    });
  }

}
