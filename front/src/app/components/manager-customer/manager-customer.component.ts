import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {CustomerModel} from '../../model/customer.model';
import {DataService} from '../../services/data.service';

declare var $: any;

@Component({
  selector: 'app-manager-customer',
  templateUrl: './manager-customer.component.html',
  styleUrls: ['./manager-customer.component.css']
})
export class ManagerCustomerComponent implements OnInit {

  public customersInit: CustomerModel[] = [];
  public empty: boolean = true;
  public selectPage: number = 1;
  public customerPerPage: number = 8;
  public customer: CustomerModel = new CustomerModel();
  public message: string = '';
  public successRegistered: boolean = false;
  @ViewChild('modal', {static: false}) modal;

  constructor(private adminService: AdminService,
              private dataService: DataService) {  }

  ngOnInit() {
    this.getCustomer();
  }

  deleteCustomer(email: string) {
    if(confirm('Are you sure?')) {
      this.adminService.deleteCustomer(email).subscribe(_ => {
        this.getCustomer();
      });
    }
  }

  getCustomer() {
    this.adminService.getAllCustomers().subscribe(data => {
      if(data.length>=1) this.empty = false;
      this.customersInit = data;
    });
  }
  submit(f: any) {
    this.dataService.checkDuplicateEmail(this.customer).subscribe(flag => {
      this.successRegistered = flag;
      this.modal.nativeElement.scrollTo(0,0);
      if(this.successRegistered) {
        this.message = 'Duplicated email address.';
      } else {
        this.message = 'Registered successfully.';
        this.dataService.register(this.customer).subscribe(_ => {
          this.getCustomer();
          setTimeout(() => {
            this.closeModal();
          }, 800);
        });
      }
    });
  }

  closeModal() {
    $('#modal-create').modal('hide');
  }
  // divide pages
  changePage(newPage: number) {
    this.selectPage = newPage;
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.customersInit.length / this.customerPerPage)).fill(0)
      .map((x, i) => i + 1);
  }
  previousPage() {
    this.changePage(this.selectPage-1);
  }

  nextPage() {
    this.changePage(this.selectPage+1);
  }

  get customers() {
    let pageIndex = (this.selectPage - 1) * this.customerPerPage;
    return this.customersInit.slice(pageIndex, pageIndex + this.customerPerPage);
  }

}
