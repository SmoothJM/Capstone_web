import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DoctorService} from '../../services/doctor.service';
import {ResearchModel} from '../../model/research.model';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  public form: FormGroup;
  public empty: boolean = false;
  public newResearch: ResearchModel = new ResearchModel();
  public researches: ResearchModel[] = [];
  public selectedResearch: ResearchModel = new ResearchModel();

  constructor(private fb: FormBuilder,
              private doctorService: DoctorService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email:'',
      author:'',
      paper:'',
      category:''
    });
    this.doctorService.getAllResearches().subscribe(data => {
      this.researches = data;
      if(this.researches.length<=0) this.empty = true;
    });

  }

  createNewPaper() {
    this.empty = !this.empty;
    this.doctorService.insertResearch(this.newResearch).subscribe(data => {
      console.log(data);
    });
  }

  viewAbstract(r: ResearchModel) {
    this.selectedResearch = r;
  }

  removeResearch(p: string) {

    // this.doctorService.removeResearch(p).subscribe(data => {
    //   console.log(data);
    // });
  }
}
