import { Component } from '@angular/core';

/**
 * Generated class for the VideoUploadComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'video-upload',
  templateUrl: 'video-upload.html'
})
export class VideoUploadComponent {

  text: string;

  constructor() {
    console.log('Hello VideoUploadComponent Component');
    this.text = 'Hello World';
  }

}
