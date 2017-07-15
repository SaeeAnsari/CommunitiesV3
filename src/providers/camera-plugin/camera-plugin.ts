import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the CameraPluginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CameraPluginProvider {

  constructor(
    public http: Http,
    private camera: Camera
  ) {

  }

  /**
     * Opens the camera so that the user can take a picture
     * @return The url of the taken image 
     */
  public open_camera(): Promise<string> {

    const options: CameraOptions = {      
      destinationType: this.camera.DestinationType ? this.camera.DestinationType.FILE_URI : 1,
      // Source of the images is the camera
      sourceType: this.camera.PictureSourceType ? this.camera.PictureSourceType.CAMERA : 1,
      // Encoding type is JPEG
      encodingType: this.camera.EncodingType ? this.camera.EncodingType.JPEG : 0,
      // Give us the full quality of the image, lower it for better performance
      quality: 100,
      // Allow editing of the image after its taken
      allowEdit: false,
      // When a image is taken via the camera also save it to the native photo album
      saveToPhotoAlbum: true,
      // Correct the orrientation of the image
      correctOrientation: true
    }

    return this.camera.getPicture(options);
  }







}
