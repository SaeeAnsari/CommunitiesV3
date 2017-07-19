import { Component, Output, EventEmitter } from '@angular/core';
import { UploadImage } from '../../interfaces/upload-image';
import { BaseLinkProvider } from '../../providers/base-link/base-link';


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { CameraPluginProvider } from '../../providers/camera-plugin/camera-plugin';

/**
 * Generated class for the ImageUploadComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'image-upload',
  templateUrl: 'image-upload.html',
  providers: [CameraPluginProvider]
})
export class ImageUploadComponent {

  private file_transfer: FileTransferObject = this.transfer.create();
  public uploaded: boolean = false;
  public mediaName: string = "";
  public mediaType: string = "";
  public uploadedMediaURL: string = "";

  @Output() OnFileSaved = new EventEmitter();

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private cameraPluginServices: CameraPluginProvider
  ) {
  }


  public async launchCamera() {

    /*
     this.OnFileSaved.emit({
        mediaType: "Image",
        fileName: "6f96dc09-e38d-489d-aa73-c85f67da2e1d.jpg",
        fullPathFileName: "http://saeedansari-001-site2.itempurl.com/MediaUpload/Story/6f96dc09-e38d-489d-aa73-c85f67da2e1d.jpg"
      });
      */
    try {

      let orignal = await this.cameraPluginServices.open_camera();
      console.log(orignal);
      this.upload(orignal);
    }
    catch (e) {
      console.log("Error : " + e);
    }
  }


  public async upload(cameraImageURL) {
    this.uploaded = false;

    console.log("In the Upload Method :  " + cameraImageURL);
    let options = {
      fileKey: 'file',
      fileName: cameraImageURL.split('/').pop(),
      mimeType: 'image/jpeg',
      chunkedMode: false,
      headers: {
        'Content-Type': undefined
      },
      params: {}
    };

    try {
      console.log("About to call the Upload Method 2 : " + JSON.stringify(options));

      let url = BaseLinkProvider.GetBaseUrl() + "/Image?type=Story";

      console.log("URL : " + url);

      let result = await this.file_transfer.upload(
        encodeURI(cameraImageURL),
        encodeURI(url),
        options,
        false
      )
      
       var parsingString = result.response;
      var fileName = parsingString.split("FileName")[parsingString.split("FileName").length - 2].replace(">", "").replace("<", "").replace("/", "");
      this.uploaded = true;

      this.mediaName = fileName;
      this.mediaType = "Image";
      this.uploadedMediaURL = BaseLinkProvider.GetMediaURL() + 'MediaUpload/Story/' + fileName;
      console.log("firing Emit!");
      this.OnFileSaved.emit({
        mediaType: "Image",
        fileName: fileName,
        fullPathFileName: this.uploadedMediaURL
      });

    } catch (e) {
      console.log("Error : " + JSON.stringify(e));

    }
  }
}
