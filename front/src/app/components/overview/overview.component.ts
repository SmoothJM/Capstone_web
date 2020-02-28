import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {LoginModel} from '../../model/login.model';
import {Diagnose} from '../../model/diagnose.model';
import {DoctorModel} from '../../model/doctor.model';
import {AppointmentModel} from '../../model/appointment.model';
import {CustomerModel} from '../../model/customer.model';
import {DoctorService} from '../../services/doctor.service';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public user: LoginModel = new LoginModel();
  public diagnoses: Diagnose[] = [];
  public wholeImg = 'http://127.0.0.1:3000/customer/tongue/';
  public boxImg = this.wholeImg + 'result_box/';
  public emptyDiagnose: boolean = false;
  public emptyAppointment: boolean = false;
  public bindDoctor: DoctorModel = new DoctorModel();
  public lastAppointment: AppointmentModel = new AppointmentModel();
  public type = 'doughnut';
  private bind = {bindYou: 0, bindOther: 0, notBind: 0};
  private app = {wait: 0, accept: 0, reject: 0, done: 0};
  private cusSex = {male: 0, female: 0, secret: 0};
  private docSex = {male: 0, female: 0, secret: 0};
  public apps: AppointmentModel[] = [];
  public customers: CustomerModel[] = [];
  public doctors: DoctorModel[] = [];
  public dataBind = {};
  public dataApp = {};
  public dataCusSex = {};
  public dataDocSex = {};
  public emptyCus: boolean = false;
  public emptyApp: boolean = false;
  public emptyDoc: boolean = false;

  public dataEmpty = {
    labels: ['Empty'],
    datasets: [
      {
        label: 'Empty',
        data: [1],
        backgroundColor: ['#6c757d']
      }]
  };

  constructor(private dataService: DataService,
              private doctorService: DoctorService,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.dataService.getSession().subscribe(data => {
      this.user = data;
      if (this.user.role == 1) {
        this.adminService.getAllCustomers().subscribe(data => {
          if (data) {
            this.customers = data;
            if(this.customers.length<=0) this.emptyCus = true;
            this.customers.forEach((ele, index) => {
              if (ele.docEmail) {
                if (ele.docEmail == this.user.email) {
                  this.bind.bindYou += 1;
                } else if (ele.docEmail != this.user.email) {
                  this.bind.bindOther += 1;
                }
              } else {
                this.bind.notBind += 1;
              }
            });
          }
          this.dataBind = {
            labels: ['Bound you', 'Bound others', 'Not bound'],
            datasets: [
              {
                label: 'Customer-bound Doctor Distribution',
                data: [this.bind.bindYou, this.bind.bindOther, this.bind.notBind],
                backgroundColor: ['#FF6384', '#43CD80', '#6c757d']
              }]
          };
        });
      } else if (this.user.role == 2) {
        this.adminService.getAllCustomers().subscribe(data => {
          if (data) {
            this.customers = data;
            if(this.customers.length<=0) this.emptyCus = true;
            this.customers.forEach((ele, index) => {
              if (ele.gender == 'male') {
                this.cusSex.male += 1;
              } else if (ele.gender == 'female') {
                this.cusSex.female += 1;
              } else if (ele.gender == 'secret') {
                this.cusSex.secret += 1;
              }
            });
          }
          this.dataCusSex = {
            labels: ['Male', 'Female', 'Secret'],
            datasets: [
              {
                label: 'Customer Gender Distribution',
                data: [this.cusSex.male, this.cusSex.female, this.cusSex.secret],
                backgroundColor: ['#02a3fe', '#ec49a6', '#8272CE']
              }]
          };
        });
      }
    });
    this.adminService.getAllDoctors().subscribe(data => {
      if (data) {
        this.doctors = data;
      } else this.emptyDoc = true;
      this.doctors.forEach((ele, index) => {
        if (ele.gender == 'male') {
          this.docSex.male += 1;
        } else if (ele.gender == 'female') {
          this.docSex.female += 1;
        } else if (ele.gender == 'secret') {
          this.docSex.secret += 1;
        }
      });
      this.dataDocSex = {
        labels: ['Male', 'Female', 'Secret'],
        datasets: [
          {
            label: 'Doctor Gender Distribution',
            data: [this.docSex.male, this.docSex.female, this.docSex.secret],
            backgroundColor: ['#02a3fe', '#ec49a6', '#8272CE']
          }]
      };
    });

    this.doctorService.getAppointments().subscribe(data => {
      if (data) {
        this.apps = data;
        this.apps.forEach((ele, index) => {
          if (ele.status == 'Waiting') {
            this.app.wait += 1;
          } else if (ele.status == 'Accepted') {
            this.app.accept += 1;
          } else if (ele.status == 'Rejected') {
            this.app.reject += 1;
          } else if (ele.status == 'Done') {
            this.app.done += 1;
          }
        });
      } else this.emptyApp = true;
      this.dataApp = {
        labels: ['Waiting', 'Accepted', 'Rejected', 'Done'],
        datasets: [
          {
            label: 'Appointments Distribution',
            data: [this.app.wait, this.app.accept, this.app.reject, this.app.done],
            backgroundColor: ['#ffc107', '#28a745', '#dc3545', '#17a2b8']
          }]
      };
    });


    this.dataService.getAllDiagnoses().subscribe(data => {
      this.diagnoses = data.slice(0, 3);
      if (data.length < 1) {
        this.emptyDiagnose = true;
      }
    });

    this.dataService.getCustomer().subscribe(currentCus => {
      if (currentCus.docEmail) {
        this.dataService.getBindDoctor(currentCus.docEmail).subscribe(data => {
          this.bindDoctor = data;
        });
      }
    });

    this.dataService.getLastAppointment().subscribe(data => {
      if (data) {
        this.lastAppointment = data;
        this.emptyAppointment = false;
      }
    });
  }
}
