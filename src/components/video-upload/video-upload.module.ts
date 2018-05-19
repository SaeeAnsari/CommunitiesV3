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
  ],
  entryComponents: [
    VideoUploadComponent
  ]
})
export class VideoUploadComponentModule {}
