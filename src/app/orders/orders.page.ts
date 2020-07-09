import { Component, OnInit } from '@angular/core';
import Amplify from '@aws-amplify/core';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Order } from '../../models';

import { environment } from '../../environments/environment';
import { from } from 'rxjs';
import { AlertController, IonItemSliding, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  title = 'datastore-demo';
  orders;
  ordersRep;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private http: HttpClient) {

    Amplify.configure(environment.amplify);

  }


  ngOnInit() {
    this.subscription();

    from(DataStore.query(Order, o => o.processed('eq', false))).subscribe(o => {
      this.orders = o;
      this.ordersRep = this.orders;
    });
  }

  doRefresh(event) {
    this.http.get('https://djed1qysue.execute-api.ap-southeast-2.amazonaws.com/prod/getOpenOrdersFromLinnworks').subscribe((o) => {
      event.target.complete();
      this.presentToast(o);
    });
  }

  async presentToast(o) {
    const toast = await this.toastCtrl.create({
      message: o.added > 0 ? `${o.added} orders has been added.` : 'No new orders.',
      duration: 2000
    });
    toast.present();
  }

  getItems(event) {
    this.ordersRep = this.orders;
    if (event.target.value.trim() !== '') {
      this.ordersRep = this.orders.filter((i) => {
        return i.numOrderId.toLowerCase().includes(event.target.value.toLowerCase().trim());
      });
    }
  }

  list() {
    from(DataStore.query(Order, o => o.processed('eq', false))).subscribe(o => {
      this.orders = o;
      this.ordersRep = this.orders;
    });
  }

  async showDeleteAlert(orderId: string, slidingItem: IonItemSliding) {
    const alertEl = await this.alertCtrl.create({
      message: 'Are you sure you want to delete this order?',
      subHeader: 'Confirm delete order',
      buttons: [
        {
            text: 'No',
            handler: () => {
              slidingItem.close();
            }
        },
        {
            text: 'Yes',
            handler: () => {
              slidingItem.close();
              this.onDelete(orderId);
            }
        }
      ]
    });
    await alertEl.present();
  }
  async onDelete(orderId: string) {
    const loadingEl = await this.loadingCtrl.create({message: 'Deleting order...'});
    loadingEl.present();

    this.fetch(orderId).subscribe(item => {
      DataStore.delete(item).then(() => {
        loadingEl.dismiss();
      });
    });

  }

  fetch(id: string) {
    return from(DataStore.query(Order as any, id));
  }

  subscription() {
    DataStore.observe(Order as any).subscribe(msg => {
      this.list();
      console.log(msg);
    });
  }
}
