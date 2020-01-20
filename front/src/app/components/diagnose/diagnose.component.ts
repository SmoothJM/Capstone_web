import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-diagnose',
  templateUrl: './diagnose.component.html',
  styleUrls: ['./diagnose.component.css']
})
export class DiagnoseComponent implements OnInit {
  public isDiagnosed = false;
  public submited = false;
  public second = 5;
  public uploadForm: FormGroup;
  public diabetesLevel: string;
  public tongueImg: File;

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  uploadSubmit() {
    // const customerName = this.uploadForm.controls.customerName.value;
    const fd = new FormData();
    fd.append('tongueImg', this.tongueImg);
    // this.submited = true;
    // setInterval(() => {
    //   this.second -= 1;
    // }, 1000);
    this.userService.uploadTongueImg(fd).subscribe(data => {
      const flag: boolean = data.flag;
      if (flag) {
        this.diabetesLevel = data.result;
      } else {
        alert(data.result);
      }
      // this.submited = false;
    });
  }

  changeImg(event) {
    this.tongueImg = event.target.files[0] as File;
    // console.log(this.tongueImg);
  }

  ngOnInit() {
  this.uploadForm = this.fb.group({
      customerName: [''],
      tongueImg: ['']
    });
  }
}
