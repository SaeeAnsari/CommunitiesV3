import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EventPostComponent } from './event-post';
import {UserPostActionComponentModule} from '../../components/user-post-action-component/user-post-action-component.module';

@NgModule({
  declarations: [
    EventPostComponent,
  ],
  imports: [
    IonicModule,
    UserPostActionComponentModule
  ],
  exports: [
    EventPostComponent
  ],
  entryComponents: [
    EventPostComponent
  ]
})
export class EventPostComponentModule {}
