import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCommentComponent } from './new-comment-component';
import {UploadedMediaPostComponentModule} from '../../components/uploaded-media-post/uploaded-media-post.module';
import {LocalGalleryUploadComponentModule} from '../../components/local-gallery-upload/local-gallery-upload.module';
import {ImageUploadComponentModule} from '../../components/image-upload/image-upload.module';
import {VideoUploadComponentModule} from '../../components/video-upload/video-upload.module';

@NgModule({
  declarations: [
    NewCommentComponent,
  ],
  imports: [
    IonicPageModule.forChild(NewCommentComponent),
    UploadedMediaPostComponentModule,
    LocalGalleryUploadComponentModule,
    ImageUploadComponentModule,
    VideoUploadComponentModule
  ],
  exports: [
    NewCommentComponent
  ],
  entryComponents: [
    NewCommentComponent
  ]
})
export class NewCommentComponentModule {}
