import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate,
  RouterStateSnapshot, Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Message} from '../model/message.model';
import {MessageService} from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  url = '/api/authLogin';

  constructor(private http: HttpClient,
              private router: Router,
              private messageService: MessageService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let flag: boolean = false;

    // console.log('guards');
    // return this.http.get<boolean>(this.url)
    // return flag;

    // return new Observable<boolean>(observe => {
    //   this.http.get<boolean>(this.url).subscribe(data => {
    //     // observe(true);
    //     if (!data) {
    //       this.messageService.reportMessage(new Message('Login first please!', true));
    //       // this.router.navigateByUrl('/');
    //     }
    //     flag = data;
    //     return flag;
    //   });
    // });

    return new Promise<boolean>((resolve) => {
      this.http.get<boolean>(this.url).subscribe(data => {

        resolve(data);
        if (!data) {
          console.log('Login first please!');
          this.messageService.reportMessage(new Message('Login first please!', true));
          this.router.navigateByUrl('/');
        }
      });
    });
  }


}
