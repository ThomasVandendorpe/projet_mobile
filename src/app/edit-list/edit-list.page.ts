import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.page.html',
  styleUrls: ['./edit-list.page.scss'],
})
export class EditListPage {
  @Input() listName: string;
//  @Input() readers: String[];
  modalCtrl : ModalController;

  constructor(params : NavParams) {
    this.modalCtrl = params.get("modalctrl");
    this.listName = params.get("listName");
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
