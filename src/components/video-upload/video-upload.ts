import { Component, Output, EventEmitter } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LoadingController, Events } from 'ionic-angular';



import { BaseLinkProvider } from '../../providers/base-link/base-link';


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

  private mediaCaptureURL: string;
  private file_transfer: FileTransferObject = this.transfer.create();
  public uploaded: boolean = false;
  public mediaName: string = "";
  public mediaType: string = "";
  public mimeType: string = "";

  @Output() OnFileSaved = new EventEmitter();

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private mediaCapture: MediaCapture,
    public loadingCtrl: LoadingController,
    private ev: Events) {
  }

  public loadVideoCamera() {
    this.uploaded = false;


    //this.DummyShowVideoSection();


    console.log("In the Upload Method");

    let options = { limit: 1, duration: 10 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => {

          console.log("getting the logs for video: " + JSON.stringify(data));
          if (data.length == 1) {
            console.log("got to data :" + JSON.stringify(data));

            this.upload(data[0].fullPath, data[0].name, data[0].type);
          }

        },
        (err: CaptureError) => console.error(err)
      );


  }

  //Dummy Image for testing
  public DummyShowVideoSection() {

    var fileName = 'http://res.cloudinary.com/http-communities-me/video/upload/v1504974348/tgsm3y6ino5a7ebsygym.mp4';
    this.mediaType = "Video";

    this.mediaName = fileName;


    this.uploaded = true;


    this.OnFileSaved.emit({

      mediaType: "Video",
      fileName: fileName,
      publicID: '222222',
      versionID: '111111'

    });
  }


  public upload(fullPath, name, mimeType) {

    console.log("Uploading video: " + fullPath + ":" + name)
    localStorage.setItem('uploadVideoFilePath', fullPath);
    localStorage.setItem('uploadVideoFileName', name);


    try {

      this.OnFileSaved.emit({
        mediaType: "Video",
        fileName: fullPath,
        name: name,
        publicID: '22222',
        versionID: '111111',
        mimeType: this.mimeType
      });
    } catch (e) {
      /*
      loading.dismiss();
      */
      console.log("Error : " + JSON.stringify(e));
    }
  }
}
