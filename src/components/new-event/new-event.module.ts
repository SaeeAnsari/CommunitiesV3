import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NewEventComponent } from './new-event';

@NgModule({
  declarations: [
    NewEventComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    NewEventComponent
  ]
})
export class NewEventComponentModule {}
