import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { HttpClientModule } from '@angular/common/http';


import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    OrdersPageRoutingModule,
    TableModule,
    TreeTableModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
