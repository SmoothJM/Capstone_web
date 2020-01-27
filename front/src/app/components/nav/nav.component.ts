import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginModel } from "../../model/login.model";
import { DataService } from "../../services/data.service";
import { Router } from '@angular/router';
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

  // @ViewChild('modal-login',{static:false}) modal2;

  constructor(private fb:FormBuilder,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:'',
      password:'',
      role:''
    });
    this.dataService.getSession().subscribe(data => {
      if (data) {
        this.correct = true;
      }
      this.userSession = data;
    });
  }

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
            this.router.navigateByUrl('/main');
          } else if (this.login.role == 1) {
            this.router.navigateByUrl('/doctor');
          } else {
            this.router.navigateByUrl('/admin');
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
    this.correct = false;
    this.userSession = '';
    this.dataService.logout().subscribe(_ => {
    });
    this.router.navigateByUrl('/');
  }

}
