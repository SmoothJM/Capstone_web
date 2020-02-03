import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginModel } from "../model/login.model";
import { CustomerModel } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  basicURL = '/api';
  // basicURL = 'http://localhost:3000'
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
    return this.sendRequest('post', this.basicURL+'/customer/checkEmail', customer);
  }
  register(customer: CustomerModel): Observable<any> {
    return this.sendRequest('post', this.basicURL+'/customer', customer);
  }
  getCustomer(): Observable<any> {
    return this.sendRequest('get', this.basicURL+'/customer');
  }

  updateCustomer(customer: CustomerModel): Observable<any> {
    return this.sendRequest('put', this.basicURL+'/customer',customer);
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
