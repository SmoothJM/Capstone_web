import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  count: number = 0;
  private subject = new Subject<number>();

  reportBadgeCount(badgeCount: number) {
    this.subject.next(badgeCount);
  }

  get badgeCount(): Observable<number> {
    return this.subject;
  }

  get originBadgeCount(): number {
    this.count += 1;
    return this.count;
  }

  beZero() {
    this.count = 0;
  }

  constructor() {
  }
}
