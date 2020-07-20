import { Injectable } from '@angular/core';
import Amplify from '@aws-amplify/core';
import { environment } from '../../environments/environment';
import { Order } from '../../models';
import { from } from 'rxjs';
import { DataStore } from '@aws-amplify/datastore';
@Injectable({
  providedIn: 'root'
})
export class DatastoreService {

  constructor() { }

  amplifyConfig() {
    Amplify.configure(environment.amplify);
  }

  getOrder(id) {
    return from(DataStore.query(Order as any, id));
  }

  updateOrder(id: string, newCustomerInfo) {
    this.getOrder(id).subscribe(item => {
      DataStore.save(
        Order.copyOf(item as any, updated => {
          updated = {
            ...item,
            customerInfo: newCustomerInfo
          };
          console.log(updated);
        })
      );
    });
  }
}
