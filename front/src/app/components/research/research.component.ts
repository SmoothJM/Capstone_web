import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DoctorService} from '../../services/doctor.service';
import {ResearchModel} from '../../model/research.model';

declare var $: any;

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  // public createForm: FormGroup;
  // public updateForm: FormGroup;
  public empty: boolean = false;
  public newResearch: ResearchModel = new ResearchModel();
  public researches: ResearchModel[] = [];
  public selectedResearch: ResearchModel = new ResearchModel();
  public fileName: string = 'Select the paper';
  public paperFile: File;
  public categories: string[] = [];
  public paperFolder: string = 'http://127.0.0.1:3000/doctor/research/';
  public isPdf: boolean = false;
  public newCategory: string = '';
  public selectPage: number = 1;
  public researchPerPage: number = 8;


  constructor(private fb: FormBuilder,
              private doctorService: DoctorService) {
  }

  ngOnInit() {
    // this.createForm = this.fb.group({
    //   cTitle:'',
    //   cAuthor:'',
    //   cPaper:'',
    //   cCategory:'',
    //   cAbstract:''
    // });
    // this.updateForm = this.fb.group({
    //   uTitle:'',
    //   uAuthor:'',
    //   uPaper:'',
    //   uCategory:'',
    //   uAbstract:''
    // });
    this.getResearches();

  }

  getResearches() {
    this.doctorService.getAllResearches().subscribe(data => {
      this.researches = data;
      if (this.researches.length <= 0) {
        this.empty = true;
      } else {
        this.researches.forEach(ele => {
          if (this.categories.indexOf(ele.category) < 0) {
            this.categories.push(ele.category);
          }
        });
      }
    });
  }

  changeFile(e: any) {
    this.paperFile = e.target.files[0];
    this.fileName = this.paperFile.name;
    let type = this.fileName.split('.')[this.fileName.split('.').length-1];
    if(type != 'pdf') {
      alert('Only accept PDF file.');
      this.isPdf = false;
    } else {
      this.isPdf = true;
    }

  }

  createNewPaper(cf: any) {
    if(confirm('Are you sure?')) {
      if(this.newCategory) {
        this.newResearch.category = this.newCategory;
        this.newResearch.paper = this.fileName;
      }
      const fd = new FormData();
      fd.append('paper', this.paperFile);
      fd.append('title', this.newResearch.title);
      fd.append('author', this.newResearch.author);
      fd.append('abstract', this.newResearch.abstract);
      fd.append('category', this.newResearch.category);
      this.doctorService.insertResearch(fd).subscribe(_ => {
        this.getResearches();
        $('#modal-create').modal('hide')
      });
    }
  }

  selectResearch(r: ResearchModel) {
    this.selectedResearch = r;
  }

  modifyResearch(r: ResearchModel) {

  }

  removeResearch(p: string) {
    if(confirm('Are you sure?')) {
      this.doctorService.removeResearch(p).subscribe(_ => {
        this.getResearches();
      });
    }
  }
  changePage(newPage: number) {
    this.selectPage = newPage;
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.researches.length / this.researchPerPage)).fill(0)
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
    return this.researches.slice(pageIndex, pageIndex + this.researchPerPage);
  }
}
