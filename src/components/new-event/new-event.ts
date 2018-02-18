import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'


import { OpenGraphServiceProvider } from '../../providers/open-graph-service/open-graph-service';
import { MediaPostService } from '../../providers/media-post-service';
import { UserService } from "../../providers/user-service";
import { EventProvider } from '../../providers/event/event';

import { LoadingController, ViewController, NavController } from 'ionic-angular';


/**
 * Generated class for the NewEventComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'new-event',
  templateUrl: 'new-event.html',
  providers: [MediaPostService, UserService, EventProvider]
})
export class NewEventComponent implements OnInit {

  public newEventForm: FormGroup;

  private postText: string = "";
  private uploadedMediaURL: string = "";

  private user;

  private imageReady: true;

  private datesValidated: boolean = true;
  private cityExists: boolean = true;

  private userCountry:string="";
  public submitted: boolean = false;

  public loading: any;


  ngOnInit() {
    this._userService.getLoggedinInUser().subscribe(sub => {
      this.user = {
        id: sub.ID,
        displayName: sub.DisplayName,
        imageURL: sub.ImageURL,
        defaultCommunityID: sub.DefaultCommunityID        
      };
      this.userCountry = sub.Country;
    });

    var today = new Date();
    var dateVal = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getDate().toString();      
        
    
    this.newEventForm.controls["startDate"].setValue(dateVal);
    
    this.newEventForm.controls["endDate"].setValue(dateVal);

    this.loading = this.loadingCtrl.create({
      content: 'Parsing...',
      spinner: 'dots'
    });
    
  }


  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _openGraphApi: OpenGraphServiceProvider,
    public loadingCtrl: LoadingController,
    private _eventService: EventProvider,
    public nav: NavController,
    public vc: ViewController,
  ) {

    this.newEventForm = this._fb.group({
      link: [''],
      name: ['', [<any>Validators.required, <any>Validators.minLength(2)]],
      description: [''],
      address: ['', [<any>Validators.required, <any>Validators.minLength(2)]],
      city: ['', [<any>Validators.required, <any>Validators.minLength(1)]],
      zip: ['', ],
      startDate: ['', [<any>Validators.required]],
      endDate: ['', [<any>Validators.required]]
    });


    this.newEventForm.controls['link'].valueChanges.debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(sub => {
        console.log('changed');
        this.listenToGraph();
      });
  }

  listenToGraph() {
    
    console.log("Graph - Checking URL exists");

    let uri = this._openGraphApi.checkIfURLExist(this.postText);

    console.log("uri: " + uri );

    if (uri != "") {
  
      this.loading.present()
      console.log("Showing Loading");
      setTimeout(()=>{
        console.log("dismissing loading");
        this.loading.dismiss();
      }, 15000);

      this._openGraphApi.GetOpenGraphDetails(uri).subscribe(sub => {
        if (sub.hybridGraph) {
          console.log("inside the graph");
          let name: string = sub.hybridGraph.title;
          
          this.uploadedMediaURL = sub.hybridGraph.image;
          this.imageReady = true;
          this.newEventForm.controls['name'].setValue(name.slice(0, 20));
          this.newEventForm.controls['description'].setValue(sub.hybridGraph.description);
        }
        this.loading.dismiss();
      });
    }
  }

  mediaSelectedForPosting(data) {

    console.log("inside the imageSelectedForPosting");
    if (data != null) {
      console.log("Got Data: " + JSON.stringify(data));

      this.imageReady = true;

      if(data.imageList != null && data.imageList.length > 0){
        this.uploadedMediaURL =data.imageList[0].fileName;
      }
      
      console.log(this.uploadedMediaURL);
    }
  }

  validateEventDates() {

    var ret: boolean = true;
    var startDateVal = this.newEventForm.controls["startDate"].value;
    var endDateVal = this.newEventForm.controls["endDate"].value;
    var today = new Date();

    var startDate = new Date(startDateVal.replace(new RegExp('-', 'gi'),'/'));
    var endDate = new Date(endDateVal.replace(new RegExp('-', 'gi'),'/'));


    if (startDate > endDate || startDate < (today)) {
      this.datesValidated = false;
      ret = false;
    }
    return ret;
  }


  saveEvent(model, isValid: boolean) {
    this.cityExists = true;//reseting
    this.submitted = true;

    let loading = this.loadingCtrl.create({
      content: 'Saving...',
      spinner: 'dots'
    });

    

    console.log("in the save event button");
    console.log("is it valid : " + isValid);
    console.log(model);

    if (isValid && isValid == true && this.validateEventDates()) {
      console.log("inside the save event");

      
      let city = this.newEventForm.controls["city"].value;

      this._eventService.ValidateCityExist(this.userCountry, city).subscribe(sub => {
        if (sub != null && sub.length > 0) {
          
          city = sub;

          if (this.user) {

            loading.present();

            var startDate = new Date(model.startDate.replace(new RegExp('-', 'gi'),'/'));
            var endDate = new Date(model.endDate.replace(new RegExp('-', 'gi'),'/'));
        

            this._eventService.PostEvent(-1,
              model.name,
              model.description,
              this.uploadedMediaURL,
              true,
              this.user.id,
              model.address,
              city,
              model.zip,
              this.userCountry,
              model.link,
              model.startDate,
              model.endDate)
              .subscribe(sub => {
                console.log("What we got is " + sub);
                let id = sub;
                loading.dismiss();
                this.vc.dismiss({ storyID: id });//this is false but hoping the live feed will just reload :)
              });
          }          
        }
        else {
          this.cityExists = false;
          loading.dismiss();
        }
      });

    }
  }

}
