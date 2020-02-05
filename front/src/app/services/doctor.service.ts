import { Injectable } from '@angular/core';
import { DoctorModel } from '../model/doctor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private basicUrl: string = '/api';
  constructor(private http: HttpClient) { }

  getDoctors():Observable<DoctorModel[]> {
    return this.sendRequest('get', this.basicUrl+'/doctor');
  }

  // getDoctors(): DoctorModel[] {
  //   this.getDoctorsObservable().subscribe()
  // }

  private sendRequest<T>(verb: string, url: string, body?: any): Observable<T> {
    let headerOptions = new HttpHeaders();
    headerOptions = headerOptions.set( 'Access-Key', '<secret>');
    headerOptions = headerOptions.set( 'Application-Name', ['BTD system', 'Jim']);
    return this.http.request<T>(verb, url, {
      body: body,
      headers: headerOptions
    });
  }
}
