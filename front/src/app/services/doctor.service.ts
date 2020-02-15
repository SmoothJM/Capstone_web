import {Injectable} from '@angular/core';
import {DoctorModel} from '../model/doctor.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private basicUrl: string = '/api';
  private doctorUrl: string = this.basicUrl + '/doctor';

  constructor(private http: HttpClient) {
  }

  getDoctors(): Observable<DoctorModel[]> {
    return this.sendRequest('get', this.doctorUrl);
  }

  getDoctor(email: string): Observable<DoctorModel> {
    return this.sendRequest('get', this.doctorUrl + '/'+email);
  }

  updateDoctor(doctor: DoctorModel): Observable<any> {
    return this.sendRequest('put', this.doctorUrl, doctor);
  };

  private sendRequest<T>(verb: string, url: string, body?: any): Observable<T> {
    let headerOptions = new HttpHeaders();
    headerOptions = headerOptions.set('Access-Key', '<secret>');
    headerOptions = headerOptions.set('Application-Name', ['BTD system', 'Jim']);
    return this.http.request<T>(verb, url, {
      body: body,
      headers: headerOptions
    });
  }
}
