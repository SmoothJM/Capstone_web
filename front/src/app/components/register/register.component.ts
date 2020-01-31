import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DataService } from "../../services/data.service";
import { CustomerModel } from '../../model/customer.model';
import { MessageService } from '../../services/message.service';
import { Message } from '../../model/message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public customer: CustomerModel = new CustomerModel();
  public form: FormGroup;
  public confirmPassword: string;
  public matchedPwd: boolean = false;
  public checkPolicy: boolean = false;

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private messageService: MessageService,
              private router: Router) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      emailc:'',
      usernamec:'',
      passwordc:'',
      confirmPwd:'',
      birthday:'',
      gender:'',
      desc:'',
      policy:false
    }
    //,{validator: this.matchPwd()}
    );
  }

  matchPwd(event: any) {
    this.matchedPwd = this.customer.password == this.confirmPassword;
    // let flag = fg.get('passwordc').value === fg.get('confirmPwd').value;
  }

  submit(registerForm: any) {
    this.dataService.checkDuplicateEmail(this.customer).subscribe(isDuplicate => {
      if(isDuplicate) {
        this.messageService.reportMessage(new Message('This email have registered!',true));
      } else {
        this.dataService.register(this.customer).subscribe(_ => {
          this.messageService.reportMessage(new Message('Register success!',false));
          setTimeout(() => {
            this.router.navigateByUrl('/');
            this.messageService.reportMessage(new Message('',false));
          },800);
        });
      }
    });
  }
}
