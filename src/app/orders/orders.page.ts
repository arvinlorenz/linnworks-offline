import { Component, OnInit } from '@angular/core';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Order } from '../../models';
import { from } from 'rxjs';
import { AlertController, IonItemSliding, LoadingController, ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import API, { graphqlOperation } from '@aws-amplify/api';
import { onOrderCount } from '../../graphql/subscriptions';
import { DatastoreService } from '../shared/datastore.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  title = 'datastore-demo';
  orders;
  ordersRep;


  isDesktop = false;
  maxItemLength;

  constructor(
    private datastoreService: DatastoreService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController,
    private http: HttpClient,
    private plt: Platform) {

      datastoreService.amplifyConfig();

      if (plt.is('desktop')) {
        this.isDesktop = true;
        console.log(this.isDesktop);
      }

  }

  async ngOnInit() {

    this.subscription();

    const orderCountSubscription = API.graphql(
      graphqlOperation(onOrderCount)
    ).subscribe({
      next: (o) => {
        console.log(o.value.data.onOrderCount.count);
        this.presentToast(o.value.data.onOrderCount.count);
      }
  });


    from(DataStore.query(Order, o => o.processed('eq', false))).subscribe(o => {
      this.orders = o;
      this.ordersRep = this.orders;
      const itemLengths = this.orders.map((or => {
        if (or.items != null) {
          return or.items.length;
        }
        return 0;
      }));
      this.maxItemLength = Math.max(...itemLengths);

    });
  }

  doRefresh(event) {
    this.http.get('https://djed1qysue.execute-api.ap-southeast-2.amazonaws.com/prod/getOpenOrdersFromLinnworks').subscribe((o) => {
      event.target.complete();
    });
  }

  async presentToast(o) {
    const toast = await this.toastCtrl.create({
      message: o > 0 ? `${o} orders has been added.` : 'No new orders.',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionCtrl.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Process order',
        icon: 'boat',
        handler: () => {
          console.log('Process');
        }
      }, {
        text: 'Print invoice',
        icon: 'print',
        handler: () => {
          console.log('Print');
        }
      }, {
        text: 'Print label',
        icon: 'print',
        handler: () => {
          console.log('Print');
        }
      }, {
        text: 'Batch Pilot',
        icon: 'airplane',
        handler: () => {
          console.log('Batch Pilot');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  selectItem(i) {
    console.log(i);
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
