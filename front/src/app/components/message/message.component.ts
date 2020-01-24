import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';
import { Router, NavigationEnd, NavigationCancel } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public lastMessage: Message;

  constructor(private messageService: MessageService,
              private router: Router) {
    messageService.messages.subscribe(m => this.lastMessage = m);
    // router.events
    //   .pipe(filter(e => e instanceof NavigationEnd || e instanceof NavigationCancel))
    //   .subscribe(e => {
    //     this.lastMessage = null;
    //   });
  }

  ngOnInit() {
  }

}
