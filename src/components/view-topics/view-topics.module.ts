import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ViewTopicsComponent } from './view-topics';

@NgModule({
  declarations: [
    ViewTopicsComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ViewTopicsComponent
  ],
  entryComponents: [
    ViewTopicsComponent
  ]
})
export class ViewTopicsComponentModule {}
