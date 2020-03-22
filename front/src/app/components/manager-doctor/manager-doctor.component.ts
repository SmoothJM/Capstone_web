import {Component, OnInit, ViewChild} from '@angular/core';
import {DoctorModel} from '../../model/doctor.model';
import {AdminService} from '../../services/admin.service';

declare var $: any;

@Component({
  selector: 'app-manager-doctor',
  templateUrl: './manager-doctor.component.html',
  styleUrls: ['./manager-doctor.component.css']
})
export class ManagerDoctorComponent implements OnInit {

  public doctorsInit: DoctorModel[] = [];
  public doctor: DoctorModel = new DoctorModel();
  public empty: boolean = true;
  public selectPage: number = 1;
  public doctorPerPage: number = 5;
  public photoPath: string = 'http://127.0.0.1:3000/doctor/photo/';
  public photoName: string = 'Select the photo of new doctor';
  public message: string = '';
  public successJoin: boolean = false;
  public photoFile: File;
  @ViewChild('modal', {static: false}) modal;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.adminService.getAllDoctors().subscribe(data => {
      this.doctorsInit = data;
      if (this.doctorsInit.length >= 1) {
        this.empty = false;
      }
    });
  }

  submit(f: any) {
    this.adminService.checkDoctorEmailIsDuplicated(this.doctor.email).subscribe(flag => {
      this.successJoin = flag;
      if(this.successJoin) {
        this.message = 'Duplicated email.';
        this.modal.nativeElement.scrollTo(0,0);
      } else {
        const fd = new FormData();
        fd.append('photo', this.photoFile);
        fd.append('email', this.doctor.email);
        fd.append('username', this.doctor.username);
        fd.append('password', this.doctor.password);
        fd.append('gender', this.doctor.gender);
        fd.append('desc', this.doctor.desc);
        fd.append('addr', this.doctor.addr);
        this.adminService.createDoctor(fd).subscribe(_ => {
          this.getDoctors();
          this.message = 'Joined successfully.';
          this.modal.nativeElement.scrollTo(0,0);
          setTimeout(() => {
            $('#modal-create').modal('hide');
          }, 800);
        });
      }
    });

  }

  changePhoto(e: any) {
    this.photoFile = e.target.files[0];
    this.photoName = this.photoFile.name;
  }

  deleteDoctor(email: string) {
    if (confirm('Are you sure?')) {
      this.adminService.deleteDoctor(email).subscribe(_ => {
        this.getDoctors();
      });
    }
  }

  // divide pages
  changePage(newPage: number) {
    this.selectPage = newPage;
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.doctorsInit.length / this.doctorPerPage)).fill(0)
      .map((x, i) => i + 1);
  }

  previousPage() {
    this.changePage(this.selectPage - 1);
  }

  nextPage() {
    this.changePage(this.selectPage + 1);
  }

  get doctors() {
    let pageIndex = (this.selectPage - 1) * this.doctorPerPage;
    return this.doctorsInit.slice(pageIndex, pageIndex + this.doctorPerPage);
  }
}
