import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, ObservedValueOf, throwError} from 'rxjs';
import { LoginModel } from "../model/login.model";
import { CustomerModel } from '../model/customer.model';
import {Diagnose} from '../model/diagnose.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // basicURL = 'http://localhost:3000'
  basicURL = '/api';
  customerURL = this.basicURL+'/customer';

  constructor(private http: HttpClient) { }

  // Login part
  getAccount(user: LoginModel): Observable<boolean> {
    return this.sendRequest<boolean>('post',this.basicURL + '/login', user);
  }
  getSession(): Observable<string> {
    return this.sendRequest('get',this.basicURL+'/sess');
  }
  logout(): Observable<any> {
    return this.sendRequest('get', this.basicURL+'/logout');
  }


  // Customer part
  checkDuplicateEmail(customer: CustomerModel): Observable<boolean> {
    return this.sendRequest('post', this.customerURL+'/checkEmail', customer);
  }
  register(customer: CustomerModel): Observable<any> {
    return this.sendRequest('post', this.customerURL, customer);
  }
  getCustomer(): Observable<any> {
    return this.sendRequest('get', this.customerURL);
  }
  updateCustomer(customer: CustomerModel): Observable<any> {
    return this.sendRequest('put', this.customerURL, customer);
  }
  uploadTongueImg(fd): Observable<any> {
    return this.sendRequest('post', this.customerURL+'/tongue', fd);
  }
  getAllDiagnoses(): Observable<Diagnose[]> {
    return this.sendRequest('get', this.customerURL+'/diagnose');
  }
  removeDiagnose(img: string): Observable<any> {
    return this.sendRequest('delete', this.customerURL+'/diagnose', {img: img});
  }


  /**
   * Total request function.
   * @param verb
   * @param url
   * @param body
   */
  private sendRequest<T>(verb: string, url: string, body?: any): Observable<T> {
    let headerOptions = new HttpHeaders();
    headerOptions = headerOptions.set( 'Access-Key', '<secret>');
    headerOptions = headerOptions.set( 'Application-Name', ['BTD system', 'Jim']);
    // headerOptions = headerOptions.set('withCredentials','true');

    return this.http.request<T>(verb, url, {
      body: body,
      headers: headerOptions
    });
  }
}
