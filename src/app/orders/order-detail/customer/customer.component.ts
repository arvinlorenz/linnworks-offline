import { Component, OnInit, Input } from '@angular/core';
import { DatastoreService } from 'src/app/shared/datastore.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  @Input() customerInfo;
  @Input() orderId;

  constructor(
    private dataStoreService: DatastoreService
  ) { }
  fullname;
  company;
  address1;
  address2;
  address3;
  region;
  town;
  postcode;

  ngOnInit() {
    this.fullname = this.customerInfo.fullName;
    this.company = this.customerInfo.company;
    this.address1 = this.customerInfo.address1;
    this.address2 = this.customerInfo.address2;
    this.address3 = this.customerInfo.address3;
    this.region = this.customerInfo.region;
    this.town = this.customerInfo.town;
    this.postcode = this.customerInfo.postCode;
  }

  onChangeData(event) {
    this.customerInfo = {
      ...this.customerInfo,
      company: event
    };
    const newCustomer = {
     ...this.customerInfo,
     company: event
   };

    this.dataStoreService.updateOrder(this.orderId, newCustomer);
  }
}
