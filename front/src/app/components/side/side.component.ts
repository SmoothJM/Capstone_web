import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {BadgeService} from '../../services/badge.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  public role: string = '';
  public collapse: boolean = false;
  public badge: number = 0;
  public diaBadge: number = 0;
  public appBadge: number = 0;

  constructor(private dataService: DataService,
              private badgeService: BadgeService) {

  }

  ngOnInit() {
    this.badgeService.diaBadgeCount.subscribe(m => {
      this.diaBadge = m;
      this.calcBadgeCount();
    });
    this.badgeService.appBadgeCount.subscribe(m => {
      this.appBadge = m;
      this.calcBadgeCount();
    });
    this.dataService.getSession().subscribe(data => {
      this.role = data['role'];
    });
  }

  calcBadgeCount() {
    this.badge = this.appBadge + this.diaBadge;
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }
}
