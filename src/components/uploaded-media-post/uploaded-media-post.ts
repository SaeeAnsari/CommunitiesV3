import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

/**
 * Generated class for the UploadedMediaPostComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'uploaded-media-post',
  templateUrl: 'uploaded-media-post.html'
})
export class UploadedMediaPostComponent implements OnInit{
  ngOnInit(): void {
    
    console.log(JSON.stringify({
      PostMediaURL: this.PostMediaURL,
      Type: this.Type
    }))
  }

  @Input() PostMediaURL: string = "";
  @Input() Type: string = "";


  constructor() {

  }



}
