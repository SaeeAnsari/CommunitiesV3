import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterUserComponent } from './register-user-component';
import {ImageUploadComponentModule} from '../../components/image-upload/image-upload.module';
import {LocalGalleryUploadComponentModule} from '../../components/local-gallery-upload/local-gallery-upload.module';

@NgModule({
  declarations: [
    RegisterUserComponent,
  ],
  imports: [
    IonicPageModule.forChild(RegisterUserComponent),
    ImageUploadComponentModule,
    LocalGalleryUploadComponentModule
  ],
  exports: [
    RegisterUserComponent
  ],
  entryComponents: [
    RegisterUserComponent
  ]
})
export class RegisterUserComponentModule {}
