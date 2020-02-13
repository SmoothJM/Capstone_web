import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Diagnose} from '../../model/diagnose.model';

@Component({
  selector: 'app-diagnose-history',
  templateUrl: './diagnose-history.component.html',
  styleUrls: ['./diagnose-history.component.css']
})
export class DiagnoseHistoryComponent implements OnInit {
  public diagnoses: Diagnose[] = [];
  public wholeImg = 'C:/Users/14534/WebstormProjects/capstone/server/public/customer/tongue/';
  public boxImg = this.wholeImg + 'result_box/';

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getAllDiagnoses().subscribe(data => {
      this.diagnoses = data;
      console.log(data);
    });
  }

  removeDiagnose(img: string) {
    if (confirm('Are you sure?')) {
      this.dataService.removeDiagnose(img).subscribe(_ => {
        this.dataService.getAllDiagnoses().subscribe(data => {
          this.diagnoses = data;
        });
      });
    }
  }
}
