import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UploadImage } from '../../interfaces/upload-image';
import { BaseLinkProvider } from '../../providers/base-link/base-link';

import { LoadingController } from 'ionic-angular';


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

  @Input() ImageCategory: string;

  @Output() OnFileSaved = new EventEmitter();

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private cameraPluginServices: CameraPluginProvider,
    public loadingCtrl: LoadingController
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
      //this.DummyShowImage();
      this.upload(orignal);
    }
    catch (e) {
      console.log("Error : " + e);
    }
  }

  //Dummy Image for testing
  public DummyShowImage() {

    var fileName = 'http://res.cloudinary.com/http-communities-me/image/upload/v1504497765/l3ofqjfmzzr8xl5lumiq.jpg';
    this.mediaType = "Image";
    this.uploadedMediaURL = fileName;
    this.mediaName = fileName;


    this.uploaded = true;


    this.OnFileSaved.emit({
      mediaType: "Image",
      fileName: fileName,
      fullPathFileName: this.uploadedMediaURL
    });
  }


  public async upload(cameraImageURL) {
    this.uploaded = false;

    let loading = this.loadingCtrl.create({
      content: 'Uploading...',
      spinner: 'dots'
    });

    loading.present();


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

      let url = BaseLinkProvider.GetBaseUrl() + "/Image?type=" + this.ImageCategory;

      console.log("URL : " + url);

      this.file_transfer.upload(
        encodeURI(cameraImageURL),
        encodeURI(url),
        options,
        false
      ).then(result => {
        console.log("RESULT OBJECT : " + JSON.stringify(result));
        var parsingString = result.response;
        console.log("Parsing String: " + parsingString);
        var fileName = parsingString.split("FileName")[parsingString.split("FileName").length - 2].replace(">", "").replace("<", "").replace("/", "");
        fileName = fileName.slice(0, -1);//comes with a / in the end. Slice will remove the /

        console.log("Full NAme: " + fileName);
        this.uploaded = true;

        this.mediaName = fileName;
        this.mediaType = "Image";
        this.uploadedMediaURL = fileName;//BaseLinkProvider.GetMediaURL() + 'MediaUpload/' + this.ImageCategory+'/' + fileName;
        console.log("firing Emit!");
        console.log("UPloadMediaURL : " + this.uploadedMediaURL);

        loading.dismiss();
        this.OnFileSaved.emit({
          mediaType: "Image",
          fileName: fileName,
          fullPathFileName: this.uploadedMediaURL
        });
      })
        .catch(error => {
          loading.dismiss();
          console.log("FILE TARNSFER ERROR : " + JSON.stringify(error));

        });



    } catch (e) {
      console.log("Error : " + JSON.stringify(e));

    }
  }
}
