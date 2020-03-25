import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ListService } from '../list.service';
import { TodoList } from '../modele';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.page.html',
  styleUrls: ['./edit-list.page.scss'],
})
export class EditListPage {
  public todolist : TodoList;

  public formAddReader: { text: string; } = { text: "" };
  public formAddWriter: { text: string; } = { text: "" };

  modalCtrl: ModalController;

  constructor(
    params: NavParams,
    private listService: ListService
  ) {
    this.setParams(params);
  }

  setParams(params: NavParams) {
    this.todolist = params.get("list");
    this.modalCtrl = params.get("modalctrl");
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true,
    });
  }

  remove_writer(writer: string) {
    this.listService.removeWriter(writer, this.todolist);
  }

  remove_reader(reader: string) {
    this.listService.removeReader(reader, this.todolist);
  }

  add_reader() {
    if(this.formAddReader.text.length > 0) {
      this.listService.addReader(this.formAddReader.text, this.todolist);
      this.formAddReader.text = "";
    }
  }

  add_writer() {
    if(this.formAddWriter.text.length > 0) {
      this.listService.addWriter(this.formAddWriter.text, this.todolist);
      this.formAddWriter.text = "";
    }
  }
}
