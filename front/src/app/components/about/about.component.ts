import { Component, OnInit } from '@angular/core';
import {ResearchModel} from '../../model/research.model';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public researchesMatch: ResearchModel[] = [];
  public researchesAll: ResearchModel[] = [];
  public categories: string[] = [];
  public empty: boolean = true;
  public selectPage: number = 1;
  public researchPerPage: number = 4;
  public selectedRes: ResearchModel = new ResearchModel();
  public selectedCate: string = '';
  public paperFolder: string = 'http://127.0.0.1:3000/doctor/research/';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllResearches().subscribe(data => {
      this.researchesAll = data;
      this.researchesMatch = data;
      if(this.researchesAll.length>=1) this.empty=false;
      this.researchesAll.forEach(ele => {
        if(this.categories.indexOf(ele.category)<0){
          this.categories.push(ele.category);
        }
      })
    })
  }

  selectRes(r: ResearchModel) {
    this.selectedRes = r;
  }

  search(){
    if(this.selectedCate) {
      this.researchesMatch = [];
      this.researchesAll.forEach(ele => {
        if(ele.category == this.selectedCate) {
          this.researchesMatch.push(ele);
        }
      });
      this.changePage(1);
    }else {
      this.researchesMatch = this.researchesAll;
      this.changePage(1);
    }
  };

  // Button group for dividing
  changePage(newPage: number) {
    this.selectPage = newPage;
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.researchesMatch.length / this.researchPerPage)).fill(0)
      .map((x, i) => i + 1);
  }
  previousPage() {
    this.changePage(this.selectPage-1);
  }

  nextPage() {
    this.changePage(this.selectPage+1);
  }

  get res() {
    let pageIndex = (this.selectPage - 1) * this.researchPerPage;
    return this.researchesMatch.slice(pageIndex, pageIndex + this.researchPerPage);
  }

}
