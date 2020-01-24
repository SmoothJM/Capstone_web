import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../model/message.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.reportMessage(new Message('',false));
  }

}
