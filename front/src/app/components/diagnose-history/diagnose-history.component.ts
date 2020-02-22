import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Diagnose} from '../../model/diagnose.model';
import {BadgeService} from '../../services/badge.service';
import {CustomerModel} from '../../model/customer.model';
import {FormBuilder} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-diagnose-history',
  templateUrl: './diagnose-history.component.html',
  styleUrls: ['./diagnose-history.component.css']
})
export class DiagnoseHistoryComponent implements OnInit {
  public diagnosesInit: Diagnose[] = [];
  // public wholeImg = 'C:/Users/14534/WebstormProjects/capstone/server/public/customer/tongue/';
  public wholeImg = 'http://127.0.0.1:3000/customer/tongue/';
  public boxImg = this.wholeImg + 'result_box/';
  public diagnosePerPage: number = 5;
  public selectedPage: number = 1;
  public empty: boolean = false;
  public customer: CustomerModel = new CustomerModel();
  public selectedDiagnose: Diagnose = new Diagnose();

  constructor(private dataService: DataService,
              private badgeService: BadgeService,
              private dataPipe: DatePipe) {
  }

  ngOnInit() {
    this.dataService.getAllDiagnoses().subscribe(data => {
      this.diagnosesInit = data;
      if (data.length<=0) this.empty = true;
    });
    this.badgeService.beDiaZero();
    this.badgeService.reportDiaBadgeCount(0);
    this.dataService.getCustomer().subscribe(data => {
      this.customer = data;
      this.customer.birthday = this.customer.birthday
        .replace(/-/g, '\/').replace(/T.+/, '');
      this.customer.birthday = this.dataPipe.transform(Date.parse(this.customer.birthday),'yyyy-MM-dd');
    });
  }

  get diagnoses() {
    let pageIndex = (this.selectedPage - 1) * this.diagnosePerPage;
    return this.diagnosesInit.slice(pageIndex, pageIndex + this.diagnosePerPage);
  }

  removeDiagnose(img: string) {
    if (confirm('Are you sure?')) {
      this.dataService.removeDiagnose(img).subscribe(_ => {
        this.dataService.getAllDiagnoses().subscribe(data => {
          this.diagnosesInit = data;
        });
      });
    }
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.diagnosesInit.length / this.diagnosePerPage)).fill(0)
      .map((x, i) => i + 1);
  }
  previousPage() {
    this.changePage(this.selectedPage-1);
  }

  nextPage() {
    this.changePage(this.selectedPage+1);
  }

  detailOfDiagnose(d: Diagnose) {
    this.selectedDiagnose = d;
  }
}
