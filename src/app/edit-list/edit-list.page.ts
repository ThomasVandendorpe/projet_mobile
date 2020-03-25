import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.page.html',
  styleUrls: ['./edit-list.page.scss'],
})
export class EditListPage {
  @Input() listName: string;
  @Input() readers: String[];
  @Input() writers: String[];
  @Input() owner: String;

  public formAddReader: { text: string; } = { text: "" };
  public formAddWriter: { text: string; } = { text: "" };

  modalCtrl: ModalController;

  constructor(params: NavParams) {
    this.modalCtrl = params.get("modalctrl");
    this.listName = params.get("listName");
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'canceled': false,
      'listName': this.listName,
      'readers': this.readers,
      'writers': this.writers
    });
  }

  cancelModal() {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'canceled': true
    });
  }

  remove_writer(writer: String) {
    const index: number = this.writers.indexOf(writer);
    if (index !== -1) {
      this.writers.splice(index, 1);
    }
  }

  remove_reader(reader: String) {
    const index: number = this.readers.indexOf(reader);
    if (index !== -1) {
      this.readers.splice(index, 1);
    }
  }

  add_reader() {
    if(this.formAddReader.text.length > 0) {
      this.readers.push(this.formAddReader.text);
      this.formAddReader.text = "";
    }
  }

  add_writer() {
    if(this.formAddWriter.text.length > 0) {
      this.writers.push(this.formAddWriter.text);
      this.formAddWriter.text = "";
    }
  }
}
