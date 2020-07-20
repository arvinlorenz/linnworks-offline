import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailPageRoutingModule } from './order-detail-routing.module';

import { OrderDetailPage } from './order-detail.page';
import { TotalsComponent } from './totals/totals.component';
import { CustomerComponent } from './customer/customer.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ItemsComponent } from './items/items.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailPageRoutingModule
  ],
  declarations: [OrderDetailPage, TotalsComponent, CustomerComponent, ShippingComponent, ItemsComponent]
})
export class OrderDetailPageModule {}
