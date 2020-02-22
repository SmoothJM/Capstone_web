import {Injectable} from '@angular/core';
import {DoctorModel} from '../model/doctor.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppointmentModel} from '../model/appointment.model';

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
    return this.sendRequest('get', this.doctorUrl + '/docEmail/'+email);
  }
  updateDoctor(doctor: DoctorModel): Observable<any> {
    return this.sendRequest('put', this.doctorUrl, doctor);
  };
  getAppointments(): Observable<AppointmentModel[]> {
    return this.sendRequest('get', this.doctorUrl + '/appointment');
  }
  updateAppointmentsStatus(thing): Observable<any> {
    return this.sendRequest('put', this.doctorUrl + '/appointment', thing);
  }

  /**
   * Total request function.
   * @param verb
   * @param url
   * @param body
   */
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
