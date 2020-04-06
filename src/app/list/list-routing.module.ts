import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import { Shake } from '@ionic-native/shake/ngx';

const routes: Routes = [
  {
    path: ':id',
    component: ListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    Shake
  ]
})
export class ListPageRoutingModule {}
