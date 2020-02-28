import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';
import {DoctorModel} from '../../model/doctor.model';
import {CustomerModel} from '../../model/customer.model';
import {ChatModel} from '../../model/chat.model';
import {FormControl} from '@angular/forms';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-customer',
  templateUrl: './chat-customer.component.html',
  styleUrls: ['./chat-customer.component.css']
})
export class ChatCustomerComponent implements OnInit {

  public doctor: DoctorModel = new DoctorModel();
  public customer: CustomerModel = new CustomerModel();
  public chatHistory: ChatModel[] = [];
  public message = new FormControl('');
  public event: any;
  @ViewChild('content', {static: false}) content;

  constructor(private dataService: DataService,
              private chatService: ChatService) { }

  ngOnInit() {

    this.dataService.getCustomer().subscribe(data => {
      this.customer = data;
      this.dataService.getBindDoctor(this.customer.docEmail).subscribe(data2 => {
        this.doctor = data2;
        this.getChatHistory();
      });
    });

  }

  getChatHistory() {
    this.chatService.getChatHistory(this.customer.email, this.doctor.email).subscribe(data => {
      this.chatHistory = data;
      if(this.content) {
        setTimeout(() => {
          this.content.nativeElement.scrollTo(this.content.nativeElement.scrollWidth,this.content.nativeElement.scrollHeight);
        },0);
      }
    });
  }

  keySend(e: any) {
    this.event = e;
    let msg = this.message.value.trim().replace(/^\s+|\s+$/g, '');
    if (this.message.valid && e.which == 13 && msg) {
      let chat = new ChatModel(this.customer.email, this.doctor.email,msg,new Date(Date.now()));
      this.chatService.addChatHistory(chat).subscribe(_ => {
        this.getChatHistory();
        e.preventDefault();
        this.message.setValue('');
      });
    } else if (e.which == 13) {
      e.preventDefault();
      this.message.setValue('');
    }
  }

  btnSend(m?: any) {
    let msg = this.message.value.trim().replace(/^\s+|\s+$/g, '');
    if (this.message.valid && msg) {
      let chat = new ChatModel(this.customer.email, this.doctor.email,msg,new Date(Date.now()));
      this.chatService.addChatHistory(chat).subscribe(_ => {
        this.getChatHistory();
      });
    }
    this.event.preventDefault();
    this.message.setValue('');
  }

}
