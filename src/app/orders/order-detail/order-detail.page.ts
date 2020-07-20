import { Component, OnInit } from '@angular/core';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { ActivatedRoute } from '@angular/router';
import { DatastoreService } from 'src/app/shared/datastore.service';
import { Router, NavigationExtras } from '@angular/router';
import { from } from 'rxjs';
import { Order } from 'src/models';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  orderId;
  order;
  segmentValue = 'total';
  constructor(
    private datastoreService: DatastoreService,
    private route: ActivatedRoute,
    // private router: Router
  ) {
    datastoreService.amplifyConfig();
    this.route.paramMap.subscribe(paramMap => {
      // if (!paramMap.has('orderId')) {
      //   this.navCtrl.navigateBack('/places/tabs/offers');
      // }

      this.orderId = paramMap.get('orderId');

      this.order = this.datastoreService.getOrder(this.orderId);
      this.datastoreService.getOrder(this.orderId).subscribe((o) => {
        this.order = o;
      });
    });
  }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.segmentValue = ev.detail.value;
  }

  // customer() {
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       order: this.order
  //     }
  //   };
  //   this.router.navigate(['orders', this.orderId, 'customer'], navigationExtras);
  // }

}
