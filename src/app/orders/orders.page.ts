import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  desktopOrders;

  @ViewChild('dt') datatable;
  adjustingDsktopHeaderRows;
  desktopHeaderRows = [
    {
      cols: [
            {field: 'numOrderId', name: 'Order Number', rowspan: '2'},
            {field: 'totalsInfo', name: 'Total', colspan: '10'},
            {field: 'customerInfo', name: 'Customer', colspan: '11'},
            {field: 'items', name: 'Items', colspan: '11'},
            {field: 'shippingInfo', name: 'Shipping', colspan: '8'}
        ]
    },
    {
        cols: [
          {field: 'currency', name: 'Currency', header: 'totalsInfo'},
          {field: 'subtotal', name: 'Subtotal', header: 'totalsInfo'},
          {field: 'totalCharge', name: 'Total Charge', header: 'totalsInfo'},
          {field: 'totalDiscount', name: 'Total Discount', header: 'totalsInfo'},
          {field: 'tax', name: 'Tax', header: 'totalsInfo'},
          {field: 'paymentMethod', name: 'Payment Method', header: 'totalsInfo'},
          {field: 'countryTaxRate', name: 'Country Tax Rate', header: 'totalsInfo'},
          {field: 'conversionRate', name: 'Conversion Rate', header: 'totalsInfo'},
          {field: 'postageCost', name: 'Postage Cost', header: 'totalsInfo'},
          {field: 'profitMargin', name: 'Profit Margin', header: 'totalsInfo'},

          {field: 'fullName', name: 'Name', header: 'customerInfo'},
          {field: 'emailAddress', name: 'Email', header: 'customerInfo'},
          {field: 'company', name: 'Company', header: 'customerInfo'},
          {field: 'address1', name: 'Address1', header: 'customerInfo'},
          {field: 'address2', name: 'Address2', header: 'customerInfo'},
          {field: 'address3', name: 'Address3', header: 'customerInfo'},
          {field: 'phoneNumber', name: 'Phone No.', header: 'customerInfo'},
          {field: 'town', name: 'Town', header: 'customerInfo'},
          {field: 'region', name: 'Region', header: 'customerInfo'},
          {field: 'postCode', name: 'Postcode', header: 'customerInfo'},
          {field: 'country', name: 'Country', header: 'customerInfo'},

          {field: 'sku', name: 'SKU', header: 'items'},
          {field: 'title', name: 'Title', header: 'items'},
          {field: 'channelSKU', name: 'Channel SKU', header: 'items'},
          {field: 'channelTitle', name: 'Channel Title', header: 'items'},
          {field: 'categoryName', name: 'Category Name', header: 'items'},
          {field: 'binRack', name: 'Bin Rack', header: 'items'},
          {field: 'availableStock', name: 'Available Stock', header: 'items'},
          {field: 'cost', name: 'Cost', header: 'items'},
          {field: 'costIncTax', name: 'Cost Inc Tax', header: 'items'},
          {field: 'quantity', name: 'Qantity', header: 'items'},
          {field: 'discount', name: 'Discount', header: 'items'},

          {field: 'vendor', name: 'Vendor', header: 'shippingInfo'},
          {field: 'trackingNumber', name: 'Tracking Number', header: 'shippingInfo'},
          {field: 'itemWeight', name: 'Item Weight', header: 'shippingInfo'},
          {field: 'totalWeight', name: 'Total Weight', header: 'shippingInfo'},
          {field: 'packageCategory', name: 'Package Category', header: 'shippingInfo'},
          {field: 'shippingPostageCost', name: 'Postage Cost', header: 'shippingInfo'},
          {field: 'postageCostExTax', name: 'Postage Cost Ex Tax', header: 'shippingInfo'},
          {field: 'postalServiceName', name: 'Postal Service Name', header: 'shippingInfo'},
          ]
    }
  ];
  treeColumns = [
    {
      label: 'Total',
      data: 'totalsInfo',
      partialSelected: undefined,
      children: [
        {data: 'currency', label: 'Currency'},
        {data: 'subtotal', label: 'Subtotal'},
        {data: 'totalCharge', label: 'Total Charge'},
        {data: 'totalDiscount', label: 'Total Discount'},
        {data: 'tax', label: 'Tax'},
        {data: 'paymentMethod', label: 'Payment Method'},
        {data: 'countryTaxRate', label: 'Country Tax Rate'},
        {data: 'conversionRate', label: 'Conversion Rate'},
        {data: 'postageCost', label: 'Postage Cost'},
        {data: 'profitMargin', label: 'Profit Margin'},

      ]
    },
    {
      label: 'Customer',
      data: 'customerInfo',
      partialSelected: undefined,
      children: [
        {data: 'fullName', label: 'Name'},
        {data: 'emailAddress', label: 'Email'},
        {data: 'company', label: 'Company'},
        {data: 'address1', label: 'Address1'},
        {data: 'address2', label: 'Address2'},
        {data: 'address3', label: 'Address3'},
        {data: 'phoneNumber', label: 'Phone No.'},
        {data: 'town', label: 'Town'},
        {data: 'region', label: 'Region'},
        {data: 'postCode', label: 'Postcode'},
        {data: 'country', label: 'Country'},
      ]
    },
    {
      label: 'Items',
      data: 'items',
      partialSelected: undefined,
      children: [
        {data: 'sku', label: 'SKU'},
        {data: 'title', label: 'Title'},
        {data: 'channelSKU', label: 'Channel SKU'},
        {data: 'channelTitle', label: 'Channel Title'},
        {data: 'categoryName', label: 'Category Name'},
        {data: 'binRack', label: 'Bin Rack'},
        {data: 'availableStock', label: 'Available Stock'},
        {data: 'cost', label: 'Cost'},
        {data: 'costIncTax', label: 'Cost Inc Tax'},
        {data: 'quantity', label: 'Qantity'},
        {data: 'discount', label: 'Discount'},
      ]
    },
    {
      label: 'Shipping',
      data: 'shippingInfo',
      partialSelected: undefined,
      children: [
        {data: 'vendor', label: 'Vendor'},
        {data: 'trackingNumber', label: 'Tracking Number'},
        {data: 'itemWeight', label: 'Item Weight'},
        {data: 'totalWeight', label: 'Total Weight'},
        {data: 'packageCategory', label: 'Package Category'},
        {data: 'shippingPostageCost', label: 'Postage Cost'},
        {data: 'postageCostExTax', label: 'Postage Cost Ex Tax'},
        {data: 'postalServiceName', label: 'Postal Service Name'},
      ]
    }
  ];
  selectedColumns;
  dataCols;


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
      }

  }
  clicked() {
    console.log(this.datatable);
  }
  updateCustomerAddress(id, header, field, e, prev) {
    if (prev === e.target.value) {
      return;
    }
    this.datastoreService.updateOrder(id, header, field, e.target.value);
  }
  async ngOnInit() {

    this.subscription();

    const orderCountSubscription = API.graphql(
      graphqlOperation(onOrderCount)
    ).subscribe({
      next: (o) => {
        this.presentToast(o.value.data.onOrderCount.count);
      }
    });

    this.realtimeOrders();

    if (localStorage.getItem('selected_columns') !== null) {
      this.checkNode(JSON.parse(localStorage.getItem('selected_columns')));
    } else {
      this.checkNode();
    }
  }

  nodeSelect(event) {

    const headings = this.selectedColumns.filter(sc => {
      return this.desktopHeaderRows[0].cols.some(dhr => dhr.field === sc.data);
    });

    const hasHeader =  this.desktopHeaderRows[1].cols.filter(dhr => {
      return this.selectedColumns.some(sc => sc.data === dhr.field);
    });

    const subheadings = hasHeader.filter(sc => {
      return !headings.some(h => h.data === sc.header);
    });

    const selectedColumns = [
      ...headings.map(h => h.data),
      ...subheadings.map(sh => sh.field),
    ];

    localStorage.setItem('selected_columns', JSON.stringify(selectedColumns));
    this.adjustTableColumns();

  }

  nodeUnselect(event) {


    if (event.node.parent === undefined) {
      for (const [key, value] of Object.entries(this.datatable.filters)) {
        if (key.split('.')[0] === event.node.data) {
          delete this.datatable.filters[event.node.data + '.' + key.split('.')[1]];
        }
      }
    } else {
      for (const [key, value] of Object.entries(this.datatable.filters)) {
        if (key === event.node.parent.data + '.' + event.node.data) {
          delete this.datatable.filters[event.node.parent.data + '.' + event.node.data];
        }
      }
    }


    const stateLocal = JSON.parse(localStorage.getItem('state-local'));
    localStorage.setItem('state-local', JSON.stringify(
      {
        ...stateLocal,
        filters: this.datatable.filters
      }
      ));

    const headings = this.selectedColumns.filter(sc => {
      return this.desktopHeaderRows[0].cols.some(dhr => dhr.field === sc.data);
    });

    const hasHeader =  this.desktopHeaderRows[1].cols.filter(dhr => {
      return this.selectedColumns.some(sc => sc.data === dhr.field);
    });

    const subheadings = hasHeader.filter(sc => {
      return !headings.some(h => h.data === sc.header);
    });

    const selectedColumns = [
      ...headings.map(h => h.data),
      ...subheadings.map(sh => sh.field),
    ];

    localStorage.setItem('selected_columns', JSON.stringify(selectedColumns));
    this.adjustTableColumns();
  }



  adjustTableColumns() {
    this.adjustingDsktopHeaderRows = [{cols: [...this.desktopHeaderRows[0].cols]}, {cols: [...this.desktopHeaderRows[1].cols]}];

    const c = this.adjustingDsktopHeaderRows[1].cols.filter(c => {
      return this.selectedColumns.some(col => col.data === c.field);
    });
    this.adjustingDsktopHeaderRows[1].cols = this.adjustingDsktopHeaderRows[1].cols.filter(c => {
      return this.selectedColumns.some(col => col.data === c.field);
    });

    this.adjustingDsktopHeaderRows[0].cols = this.adjustingDsktopHeaderRows[0].cols.map((dhr) => {
        if (dhr.field === 'totalsInfo' || dhr.field === 'customerInfo' || dhr.field === 'items' || dhr.field === 'shippingInfo') {
          return {
            ...dhr,
            colspan: c.reduce((counter, {header}) => header === dhr.field  ? counter + 1 : counter, 0) || 0
          };
        }
        return {
          ...dhr
        };
      });

    this.adjustingDsktopHeaderRows[0].cols =
      [
          this.adjustingDsktopHeaderRows[0].cols[0],
        ...this.adjustingDsktopHeaderRows[0].cols.filter(c => c.colspan > 0)
      ];
    this.dataCols = [{field: 'numOrderId'}, ...c.map((fi: any) => {
        return  {field: fi.field, header: fi.header };
    })];

  }
  checkNode(scs = ['totalsInfo', 'customerInfo', 'items', 'shippingInfo']) {
    const arraySelected = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < scs.length; i++) {

      const firstLevelIsExisting = this.treeColumns.some(h => {
        return h.data === scs[i];
      });

      if (firstLevelIsExisting) {
        const tcIndex = this.treeColumns.findIndex(tc => tc.data === scs[i]);
        if (this.treeColumns[tcIndex].children == null) {
          arraySelected.push(this.treeColumns[tcIndex]);
        } else {
          this.treeColumns[tcIndex].partialSelected = false,
          arraySelected.push(this.treeColumns[tcIndex]);
          arraySelected.push(...this.treeColumns[tcIndex].children);
        }
      }

      else {
        let j = 0;
        this.treeColumns.forEach(tc => {
          if (tc.children != null) {
            const child = tc.children.find(h => {
              return h.data === scs[i];
            });
            if (child) {

              this.treeColumns[j].partialSelected = true,
              arraySelected.push(child);
            }
          }
          j++;
        });
      }
    } // for loop

    this.selectedColumns = arraySelected;
  }

  realtimeOrders() {
    from(DataStore.query(Order, o => o.processed('eq', false))).subscribe(o => {

      this.orders = o;
      this.ordersRep = this.orders;
      if (this.plt.is('desktop')) {


        this.dataCols = [{field: 'numOrderId'}, ...this.desktopHeaderRows[1].cols.map((fi: any) => {
          return  {field: fi.field, header: fi.header };
        })];

        this.desktopOrders = this.orders.reduce((acc, i) => {
          acc.push({
            ...i,
            items: i.items != null ? {
              sku: i.items.map((item => item.sku)).join('|||'),
              title: i.items.map((item => item.title)).join('|||'),
              channelSKU: i.items.map((item => item.channelSKU)).join('|||'),
              channelTitle: i.items.map((item => item.channelTitle)).join('|||'),
              categoryName: i.items.map((item => item.categoryName)).join('|||'),
              binRack: i.items.map((item => item.binRack)).join('|||'),
              availableStock: i.items.map((item => item.availableStock)).join('|||'),
              cost: i.items.map((item => item.cost)).join('|||'),
              costIncTax: i.items.map((item => item.costIncTax)).join('|||'),
              quantity: i.items.map((item => item.quantity)).join('|||'),
              discount: i.items.map((item => item.discount)).join('|||'),
            } : null
          });
          return acc;
        }, []);

      }

      this.adjustTableColumns();

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
        }
      }, {
        text: 'Process order',
        icon: 'boat',
        handler: () => {
        }
      }, {
        text: 'Print invoice',
        icon: 'print',
        handler: () => {
        }
      }, {
        text: 'Print label',
        icon: 'print',
        handler: () => {
        }
      }, {
        text: 'Batch Pilot',
        icon: 'airplane',
        handler: () => {
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  selectItem(i) {
  }
  getItems(event) {
    this.ordersRep = this.orders;
    if (event.target.value.trim() !== '') {
      this.ordersRep = this.orders.filter((i) => {
        return i.numOrderId.toLowerCase().includes(event.target.value.toLowerCase().trim());
      });
    }
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
      this.realtimeOrders();
      console.log(msg);
    });
  }
}
