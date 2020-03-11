import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.page.html',
  styleUrls: ['./edit-list.page.scss'],
})
export class EditListPage {
  @Input() listName: string;
//  @Input() readers: String[];

  constructor(params : NavParams) { 
    this.listName = params.get("listName");
  }
}
