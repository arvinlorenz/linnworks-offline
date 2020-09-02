import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { HttpClientModule } from '@angular/common/http';


import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {TreeModule} from 'primeng/tree';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';






@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    OrdersPageRoutingModule,
    TableModule,
    MultiSelectModule,
    TreeModule,
    InputTextModule,
    DropdownModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
