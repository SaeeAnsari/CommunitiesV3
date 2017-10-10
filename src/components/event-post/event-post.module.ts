import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EventPostComponent } from './event-post';

@NgModule({
  declarations: [
    EventPostComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    EventPostComponent
  ]
})
export class EventPostComponentModule {}
