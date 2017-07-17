import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VideoUploadComponent } from './video-upload';

@NgModule({
  declarations: [
    VideoUploadComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    VideoUploadComponent
  ]
})
export class VideoUploadComponentModule {}
