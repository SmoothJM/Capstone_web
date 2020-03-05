import {Injectable,Output, EventEmitter} from '@angular/core';
import {CustomerModel} from '../model/customer.model';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
// import {Message} from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class ForwardService {

  public sc: CustomerModel = new CustomerModel();
  // @Output() ce: EventEmitter<CustomerModel> = new EventEmitter();

  constructor() { }

  // transfer(e: CustomerModel) {
  //   this.ce.emit(e);
  // }

  // private subject = new Subject<CustomerModel>();
  //
  // reportCustomer(c: CustomerModel) {
  //   this.subject.next(c);
  // }

  // get sc(): Observable<CustomerModel> {
  //   return this.subject;
  // }

}
