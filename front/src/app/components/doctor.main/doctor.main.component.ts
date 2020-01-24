import { Component, OnInit } from '@angular/core';
import {Message} from '../../model/message.model';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-doctor-main',
  templateUrl: './doctor.main.component.html',
  styleUrls: ['./doctor.main.component.css']
})
export class DoctorMainComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.reportMessage(new Message('',false));
  }

}
