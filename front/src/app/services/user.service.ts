import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  uploadTongueImg(fd): Observable<any> {
    // http://localhost:3000/uploadTongue
    const url = '/api/uploadTongue';
    const headerOptions = { headers: new HttpHeaders({responseType: 'text'})  };
    return this.http.post(url, fd, headerOptions);
  }
}
