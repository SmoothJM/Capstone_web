import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {CustomerModel} from '../../model/customer.model';

@Component({
  selector: 'app-manager-customer',
  templateUrl: './manager-customer.component.html',
  styleUrls: ['./manager-customer.component.css']
})
export class ManagerCustomerComponent implements OnInit {

  public customers: CustomerModel[] = [];

  constructor(private adminService: AdminService) {  }

  ngOnInit() {
    this.adminService.getAllCustomers().subscribe(data => {
      this.customers = data;
      console.log(this.customers);
    });
  }

}
