import {Injectable} from '@angular/core';
import {DoctorModel} from '../model/doctor.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppointmentModel} from '../model/appointment.model';
import {Diagnose} from '../model/diagnose.model';
import {CustomerModel} from '../model/customer.model';
import {ResearchModel} from '../model/research.model';

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
  updateAppointmentStatus(thing): Observable<any> {
    return this.sendRequest('put', this.doctorUrl + '/appointment', thing);
  }
  getDiagnosesByDocEmail(docEmail): Observable<any> {
    return this.sendRequest('get', this.doctorUrl + '/diagnose/' + docEmail);
  }
  getCustomersBoundThisDoctor(): Observable<CustomerModel[]> {
    return this.sendRequest('get', this.doctorUrl + '/customer')
  }
  getAllResearches(): Observable<ResearchModel[]> {
    return this.sendRequest('get', this.doctorUrl + '/research');
  }
  insertResearch(r: any): Observable<any> {
    return this.sendRequest('post', this.doctorUrl + '/research', r);
  }
  removeResearch(p: string): Observable<any> {
    return this.sendRequest('delete', this.doctorUrl + '/research', {paper:p});
  }
  updateResearch(r: any): Observable<any> {
    return this.sendRequest('put', this.doctorUrl + '/research', r);
  }

  /**
   * Total request function.
   * @param verb
   * @param url
   * @param body
   * @param params
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
