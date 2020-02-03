import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CustomerModel } from '../../model/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Message } from '../../model/message.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public customer: CustomerModel = new CustomerModel();
  public form: FormGroup;
  // public birth = new Date('05-18-1994');

  constructor(private dataService: DataService,
              private fb: FormBuilder,
              private dataPipe: DatePipe,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email:'',
      username:'',
      birthday:'',
      gender:'',
      desc:'',
    });

    this.dataService.getCustomer().subscribe(data => {
      this.customer = data;
      this.customer.birthday = this.customer.birthday
        .replace(/-/g, '\/').replace(/T.+/, '');

      this.customer.birthday = this.dataPipe.transform(Date.parse(this.customer.birthday),'yyyy-MM-dd');

    })
  }

  submit(f:any) {
    this.dataService.updateCustomer(this.customer).subscribe(data => {
      this.messageService.reportMessage(new Message('The changes have been saved！'));
      this.router.navigateByUrl('/main/overview');
      console.log(data);
      setTimeout(() => {
        this.messageService.reportMessage(new Message(''));
      }, 800);
    });
  }

}
