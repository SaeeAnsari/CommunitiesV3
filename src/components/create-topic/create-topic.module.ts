import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CreateTopicComponent } from './create-topic';

@NgModule({
  declarations: [
    CreateTopicComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    CreateTopicComponent
  ]
})
export class CreateTopicComponentModule {}
