import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ImageUploadComponent } from './image-upload';

@NgModule({
  declarations: [
    ImageUploadComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ImageUploadComponent
  ]
})
export class ImageUploadComponentModule {}
