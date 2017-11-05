import { Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { BaseLinkProvider } from '../../providers/base-link/base-link';

import { LoadingController } from 'ionic-angular';


import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
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
export class ImageUploadComponent implements OnInit {
  
  


  private file_transfer: FileTransferObject = this.transfer.create();
  public uploaded: boolean = false;
  public mediaType: string = "";
  public cloudFileURL: string = "";
  public replaceIconWithImage: boolean = false;

  @Input() UpdateIconImageOnUpload: string="";
  @Input() ImageCategory: string;

  @Output() OnFileSaved = new EventEmitter();

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private cameraPluginServices: CameraPluginProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ngOnInit(): void {
      this.SetImageReplaceParam();
  }

    private SetImageReplaceParam() {
        this.replaceIconWithImage = this.UpdateIconImageOnUpload == "true" && this.cloudFileURL.length > 0;
    }

  public async launchCamera() {

    
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


    this.uploaded = true;

    this.cloudFileURL = fileName;
    this.SetImageReplaceParam();

    this.OnFileSaved.emit({
      mediaType: "Image",
      imageList: [{
        id:-1,
        fileName: fileName,
        publicID: "222",
        versionID :"222"
      }]         
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
        
   
        var fileName = parsingString.substring(parsingString.indexOf("<FileName>"), parsingString.indexOf("</FileName>")).replace("<FileName>", "");
        var publicID = parsingString.substring(parsingString.indexOf("<PublicID>"), parsingString.indexOf("</PublicID>")).replace("<PublicID>", "");
        var versionID = parsingString.substring(parsingString.indexOf("<VersionID>"), parsingString.indexOf("</VersionID>")).replace("<VersionID>", "")

        console.log("FileName: " + fileName + ", publicID: " + publicID + ", versionID: " + versionID);
        
        this.uploaded = true;
        this.mediaType = "Image";

        
        this.cloudFileURL = fileName;
        this.SetImageReplaceParam();

        loading.dismiss();


        this.OnFileSaved.emit({
          mediaType: "Image",
          imageList: [{
            id:-1,
            fileName: fileName,
            publicID: publicID,
            versionID :versionID
          }]         
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
