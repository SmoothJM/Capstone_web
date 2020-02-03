import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  public role: string = '';
  public collapse: boolean = false;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.getSession().subscribe(data => {
      this.role = data['role'];
    });
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }
}
