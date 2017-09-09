import { Component, Output, EventEmitter } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LoadingController } from 'ionic-angular';



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

  @Output() OnFileSaved = new EventEmitter();

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private mediaCapture: MediaCapture,
    public loadingCtrl: LoadingController) {
  }

  public async loadVideoCamera() {
    this.uploaded = false;
    /*
        this.OnFileSaved.emit({
           mediaType: "Video",
           fileName: "c00056b1-a244-416d-a6e2-ce15e3d9a821.mp4",
           fullPathFileName: "http://saeedansari-001-site2.itempurl.com/MediaUpload/Story/c00056b1-a244-416d-a6e2-ce15e3d9a821.mp4"
         });
      */

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

  public async upload(fullPath, name, mimeType) {


    let loading = this.loadingCtrl.create({
      content: 'Uploading...',
      spinner: 'dots'
    });

    loading.present();

    this.mediaCaptureURL = fullPath;
    console.log(this.mediaCaptureURL)

    let options = {
      fileKey: 'file',
      fileName: name,
      mimeType: mimeType,
      chunkedMode: false,
      headers: {
        'Content-Type': undefined
      },
      params: {}
    };


    try {
      console.log("About to call the Upload Method 2 : " + JSON.stringify(options));

      let url = BaseLinkProvider.GetBaseUrl() + "/Video";

      console.log("URL : " + url);

      let result = await this.file_transfer.upload(
        encodeURI(this.mediaCaptureURL),
        encodeURI(url),
        options,
        false
      );


      var parsingString = result.response;

      var fileName = parsingString.substring(parsingString.indexOf("<FileName>"), parsingString.indexOf("</FileName>")).replace("<FileName>", "");
      var publicID = parsingString.substring(parsingString.indexOf("<PublicID>"), parsingString.indexOf("</PublicID>")).replace("<PublicID>", "");
      var versionID = parsingString.substring(parsingString.indexOf("<VersionID>"), parsingString.indexOf("</VersionID>")).replace("<VersionID>", "")

      console.log("FileName: " + fileName + ", publicID: " + publicID + ", versionID: " + versionID);
      this.uploaded = true;


      this.mediaName = fileName;
      this.mediaType = "Video";
      this.mediaCaptureURL = BaseLinkProvider.GetMediaURL() + 'MediaUpload/Story/' + fileName;
      console.log("firing Emit!" + JSON.stringify({
        mediaType: "Video",
        fileName: fileName,
        fullPathFileName: this.mediaCaptureURL,
        publicID: publicID
      }));

      loading.dismiss();

      this.OnFileSaved.emit({
        mediaType: "Video",
        fileName: fileName,
        fullPathFileName: fileName,
        publicID: publicID,
        versionID: versionID
      });

    } catch (e) {
      loading.dismiss();
      console.log("Error : " + JSON.stringify(e));

    }
  }
}
