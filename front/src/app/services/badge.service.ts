import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  diaCount: number = 0;
  appCount: number = 0;

  private diaSubject = new Subject<number>();
  private appSubject = new Subject<number>();

  reportDiaBadgeCount(badgeCount: number) {
    this.diaSubject.next(badgeCount);
  }

  get diaBadgeCount(): Observable<number> {
    return this.diaSubject;
  }

  get originDiaBadgeCount(): number {
    this.diaCount += 1;
    return this.diaCount;
  }

  beDiaZero() {
    this.diaCount = 0;
  }

  constructor() {  }

  reportAppBadgeCount(badgeCount: number) {
    this.appSubject.next(badgeCount);
  }

  get appBadgeCount(): Observable<number> {
    return this.appSubject;
  }

  get originAppBadgeCount(): number {
    this.appCount += 1;
    return this.appCount;
  }

  beAppZero() {
    this.appCount = 0;
  }
}
