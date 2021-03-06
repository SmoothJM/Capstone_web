import {Component, OnInit, ViewChild, DoCheck} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginModel } from "../../model/login.model";
import { DataService } from "../../services/data.service";
import { Router } from '@angular/router';
import {MessageService} from '../../services/message.service';
import {Message} from '../../model/message.model';
import {BadgeService} from '../../services/badge.service';
// import * as $ from 'jquery';
declare var $:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public loginForm : FormGroup;
  public login: LoginModel = new LoginModel(0);
  public userSession: string;
  public correct: boolean = false;
  public setMessage: boolean = false;
  public message: string;
  public home: string;

  // @ViewChild('modal-login',{static:false}) modal2;

  constructor(private fb:FormBuilder,
              private dataService: DataService,
              private router: Router,
              private messageService: MessageService,
              private badgeService: BadgeService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:'',
      password:'',
      role:''
    });
    this.dataService.getSession().subscribe(data => {
      if (data) {
        this.correct = true;
        switch (data['role']) {
          case 0:
            this.home = '/main/overview';
            break;
          case 1:
            this.home = '/doctor/overview';
            break;
          case 2:
            this.home = '/admin/overview';
            break;
        }
      }
      this.userSession = data['username'];
    });
  }

  // ngDoCheck(): void {
  //   this.dataService.getSession().subscribe(data => {
  //     this.userSession = data['username'];
  //   });
  // }

  setCorrect() {
    this.setMessage = false;
  }

  closeModal() {
    $('#modal-login').modal('hide');
  }

  submitForm(form: any) {
    this.dataService.getAccount(this.login).subscribe(data => {
      this.setMessage = true;
      this.message = data['message'];
      if (data['correct']) {
        this.correct = data['correct'];
        this.userSession = data['username'];
        setTimeout(() => {
          if (this.login.role == 0) {
            this.router.navigateByUrl('/main/overview');
            this.home = '/main';
          } else if (this.login.role == 1) {
            this.router.navigateByUrl('/doctor/overview');
            this.home = '/doctor';
          } else {
            this.router.navigateByUrl('/admin/overview');
            this.home = '/admin';
          }
          this.closeModal();
          this.setMessage = false;
        },800);
      } else {
        this.correct = false;
      }
    });
  }

  logout() {
    this.badgeService.beDiaZero();
    this.correct = false;
    this.userSession = '';
    this.dataService.logout().subscribe(_ => {
    });
    this.messageService.reportMessage(new Message('',false));
    this.router.navigateByUrl('/');
  }

}
