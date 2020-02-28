import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoginModel} from '../../model/login.model';
import {Diagnose} from '../../model/diagnose.model';
import {CustomerModel} from '../../model/customer.model';
import {DoctorService} from '../../services/doctor.service';
import {DataService} from '../../services/data.service';
import {FormControl} from '@angular/forms';
import {Message} from '../../model/message.model';
import {MessageService} from '../../services/message.service';
import {ChatService} from '../../services/chat.service';
import {ChatModel} from '../../model/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public doctor: LoginModel = new LoginModel();
  public customers: CustomerModel[] = [];
  public selectedCus: CustomerModel = new CustomerModel();
  public empty: boolean = false;
  public message = new FormControl('');
  public event: any;
  public chatHistory: ChatModel[] = [];

  @ViewChild('content', {static: false}) content;

  constructor(private doctorService: DoctorService,
              private dataService: DataService,
              private chatService: ChatService) {

  }

  ngOnInit() {
    this.dataService.getSession().subscribe(data => {
      this.doctor = data;
    });
    this.doctorService.getCustomersBoundThisDoctor().subscribe(data => {
      this.customers = data;
      if (this.customers.length <= 0) {
        this.empty = true;
      }
    });
  }

  selectCus(c: CustomerModel) {
    this.selectedCus = c;
    this.chatService.getChatHistory(this.doctor.email, this.selectedCus.email).subscribe(data => {
      this.chatHistory = data;
    });
  }

  keySend(e: any) {
    this.event = e;
    let msg = this.message.value.trim().replace(/^\s+|\s+$/g, '');
    if (this.message.valid && e.which == 13 && msg) {
      console.log(msg);
      e.preventDefault();
      this.message.setValue('');
    } else if (e.which == 13) {
      e.preventDefault();
      this.message.setValue('');
    }
  }

  btnSend(m?: any) {
    let msg = this.message.value.trim().replace(/^\s+|\s+$/g, '');
    if (this.message.valid && msg) {
      console.log(msg);
    }
    this.event.preventDefault();
    this.message.setValue('');
  }

}
