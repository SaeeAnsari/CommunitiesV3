import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommunitiesSlidesComponent } from './communities-slides';

@NgModule({
  declarations: [
    CommunitiesSlidesComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    CommunitiesSlidesComponent
  ],
  entryComponents: [
    CommunitiesSlidesComponent
  ]
})
export class CommunitiesSlidesComponentModule {}
