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
  public cFileName: string = 'Select the paper';
  public cPaperFile: File;
  public mFileName: string = 'Select the paper';
  public mPaperFile: File;
  public mPaperChanged: boolean = false;
  public categories: string[] = [];
  public paperFolder: string = 'http://127.0.0.1:3000/doctor/research/';
  public isPdf: boolean = false;
  public ismPdf: boolean = true;
  public cNewCategory: string = '';
  public mNewCategory: string = '';
  public selectPage: number = 1;
  public researchPerPage: number = 8;
  public id: string = '';


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
    this.cPaperFile = e.target.files[0];
    this.cFileName = this.cPaperFile.name;
    let type = this.cFileName.split('.')[this.cFileName.split('.').length-1];
    if(type != 'pdf') {
      alert('Only accept PDF file.');
      this.isPdf = false;
    } else {
      this.isPdf = true;
    }
  }

  modifyFile(e: any) {
    this.mPaperChanged = true;
    this.mPaperFile = e.target.files[0];
    this.mFileName = this.mPaperFile.name;
    let type = this.mFileName.split('.')[this.mFileName.split('.').length-1];
    if(type != 'pdf') {
      alert('Only accept PDF file.');
      this.ismPdf = false;
    } else {
      this.ismPdf = true;
    }
  }
  createNewPaper(cf: any) {
    if(confirm('Are you sure?')) {
      if(this.cNewCategory) {
        this.newResearch.category = this.cNewCategory;
        this.newResearch.paper = this.cFileName;
      }
      const fd = new FormData();
      fd.append('paper', this.cPaperFile);
      fd.append('title', this.newResearch.title);
      fd.append('author', this.newResearch.author);
      fd.append('abstract', this.newResearch.abstract);
      fd.append('category', this.newResearch.category);
      this.doctorService.insertResearch(fd).subscribe(_ => {
        this.cPaperFile = null;
        this.getResearches();
        $('#modal-create').modal('hide')
      });
    }
  }


  modifyResearch(mf: any){
    if(confirm('Are you sure?')) {
      const fd = new FormData();
      if(this.mNewCategory) {
        this.selectedResearch.category = this.mNewCategory;
      }
      fd.append('id', this.id);
      fd.append('title', this.selectedResearch.title);
      fd.append('author', this.selectedResearch.author);
      fd.append('abstract', this.selectedResearch.abstract);
      fd.append('category', this.selectedResearch.category);
      if(this.mPaperChanged) {
        fd.append('paper', this.mPaperFile);
      }
      this.doctorService.updateResearch(fd).subscribe(_ => {
        this.mPaperFile = null;
        this.getResearches();
        $('#modal-modify').modal('hide')
      });
    }
  }

  selectResearch(r: any) {
    this.selectedResearch = r;
    this.id = r._id;
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
