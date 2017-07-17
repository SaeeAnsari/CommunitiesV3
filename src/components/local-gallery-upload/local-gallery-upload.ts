import { Component } from '@angular/core';

/**
 * Generated class for the LocalGalleryUploadComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'local-gallery-upload',
  templateUrl: 'local-gallery-upload.html'
})
export class LocalGalleryUploadComponent {

  text: string;

  constructor() {
    console.log('Hello LocalGalleryUploadComponent Component');
    this.text = 'Hello World';
  }

}
