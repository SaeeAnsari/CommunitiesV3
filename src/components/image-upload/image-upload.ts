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
  public mediaType: string = "";

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
        
        /*var fileName = parsingString.split("FileName")[parsingString.split("FileName").length - 2].replace(">", "").replace("<", "").replace("/", "");
        fileName = fileName.slice(0, -1);//comes with a / in the end. Slice will remove the /

        console.log("XML PArsed loosk like: " + JSON.stringify(this.xmlToJson(parsingString)));

        console.log("Full NAme: " + fileName);
        */

        var fileName = parsingString.substring(parsingString.indexOf("<FileName>"), parsingString.indexOf("</FileName>")).replace("<FileName>", "");
        var publicID = parsingString.substring(parsingString.indexOf("<PublicID>"), parsingString.indexOf("</PublicID>")).replace("<PublicID>", "");
        var versionID = parsingString.substring(parsingString.indexOf("<VersionID>"), parsingString.indexOf("</VersionID>")).replace("<VersionID>", "")

        console.log("FileName: " + fileName + ", publicID: " + publicID + ", versionID: " + versionID);
        
        this.uploaded = true;
        this.mediaType = "Image";

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

  // Changes XML to JSON
  public xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof (obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof (obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }
}
