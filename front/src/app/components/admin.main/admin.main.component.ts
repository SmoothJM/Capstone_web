import { Component, OnInit } from '@angular/core';
import {Message} from '../../model/message.model';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin.main.component.html',
  styleUrls: ['./admin.main.component.css']
})
export class AdminMainComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.reportMessage(new Message('',false));
  }

}
