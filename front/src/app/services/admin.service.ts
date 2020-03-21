import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomerModel} from '../model/customer.model';
import {DoctorModel} from '../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private basicUrl: string = '/api';
  private adminUrl: string = this.basicUrl + '/admin';

  constructor(private http: HttpClient) { }

  // Customer part
  getAllCustomers(): Observable<CustomerModel[]> {
    return this.sendRequest('get', this.adminUrl + '/customer');
  }
  createCustomer(c: CustomerModel): Observable<any> {
    return this.sendRequest('post', this.adminUrl + '/customer');
  }
  deleteCustomer(e: string): Observable<any> {
    return this.sendRequest('delete', this.adminUrl + '/customer', {email:e});
  }




  // Doctor part
  getAllDoctors(): Observable<DoctorModel[]> {
    return this.sendRequest('get', this.adminUrl + '/doctor');
  }
  createDoctor(c: DoctorModel): Observable<any> {
    return this.sendRequest('post', this.adminUrl + '/doctor');
  }
  deleteDoctor(e: string): Observable<any> {
    return this.sendRequest('delete', this.adminUrl + '/doctor');
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
