import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NewEventComponent } from './new-event';
import {LocalGalleryUploadComponentModule} from '../../components/local-gallery-upload/local-gallery-upload.module';

@NgModule({
  declarations: [
    NewEventComponent,
  ],
  imports: [
    IonicModule,
    LocalGalleryUploadComponentModule
  ],
  exports: [
    NewEventComponent
    
  ],
  entryComponents: [
    NewEventComponent
  ]
})
export class NewEventComponentModule {}
