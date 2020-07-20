import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() items;
  segmentValue;
  selectedItem;
  constructor() { }

  ngOnInit() {
    this.selectedItem = this.items[0];
  }

  segmentChanged(ev: any) {
    this.segmentValue = ev.detail.value;
    this.selectedItem = this.items[this.segmentValue];
  }
}
