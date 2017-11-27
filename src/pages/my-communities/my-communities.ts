import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommunityService } from '../../providers/community-service';
import { UserService } from '../../providers/user-service';
import { Community } from '../../interfaces/community';
import { FormGroup, FormControl } from '@angular/forms';


import { CommunityPage } from '../../pages/community/community';



import { Observable } from 'rxjs/Observable';


// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


/**
 * Generated class for the MyCommunitiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-communities',
  templateUrl: 'my-communities.html',
  providers: [CommunityService, UserService]
})

export class MyCommunitiesPage implements OnInit {


  public searchVal: string = "";
  public communitiesLoadedEmptySearh: boolean = false;
  public lastSearchVal: string = "";
  searchItems = [];
  searchInput = new FormControl();

  private pageIndex: number = 0;




  ngOnInit(): void {


    console.log("My Communities Initializing");
  }


  public initialBindCommunitiesList() {

    //this.searchItems = [];

    if (this.searchVal == undefined)
      this.searchVal = '';

    
      let userID = this._userService.GetLoggedInUserID();

      this._searchService.GetAllCommunities(this.searchVal, userID, this.pageIndex)
        .subscribe(sub => {

          this.pageIndex = this.pageIndex + 1;

          sub.forEach(element => {


            var community = {
              id: element.ID,
              name: element.Name,
              description: element.Description,
              ownerID: element.OwnerID,
              ownerName: element.OwnerName,
              typeID: 1,
              typeName: 'City',
              imageURL: element.ImageURL,
              lastUpdate: null,
              isMember: element.isMember,
              userCount: element.UserCount
            };

            this.searchItems.push(community);
          });
        });

  }


  bindCommunitiesList_Paging(): Promise<any> {


    return new Promise((resolve) => {
      setTimeout(() => {

        //this.searchItems = [];



        if (this.searchVal == undefined)
          this.searchVal = '';

        
          let userID = this._userService.GetLoggedInUserID();

          this._searchService.GetAllCommunities(this.searchVal, userID, this.pageIndex)
            .subscribe(sub => {

              if (sub.length > 0) {
                this.pageIndex = this.pageIndex + 1;

                //reset back to zero when all items are exhausted
                /*else if (sub.length == 0 && this.pageIndex > 0){
                  this.pageIndex = 0;
                  this.initialBindCommunitiesList();
                }*/

                sub.forEach(element => {
                  var community = {
                    id: element.ID,
                    name: element.Name,
                    description: element.Description,
                    ownerID: element.OwnerID,
                    ownerName: element.OwnerName,
                    typeID: 1,
                    typeName: 'City',
                    imageURL: element.ImageURL,
                    lastUpdate: null,
                    isMember: element.isMember,
                    userCount: element.UserCount
                  };

                  this.searchItems.push(community);
                });
              }
            });
        

        resolve();
      }, 500);
    })
  }

  userJoinedCommunity(data) {

    if (data && data.communityID && data.isMember) {
      this.searchItems.forEach(item => {
        if (item.id == data.communityID) {
          item.isMember = data.isMember == "true" ? "false" : "true"
        }
      })
    }
  }


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _searchService: CommunityService,
    private _userService: UserService
  ) {
  }

  ionViewDidEnter() {

    this.searchItems = [];
    this.pageIndex = 0;
    this.lastSearchVal = "";
    this.searchVal = "";


    if (this.searchVal == "") {//handling first load
      this.initialBindCommunitiesList();      
    }
  }

  ionViewDidLoad() {

    
    this.searchInput.valueChanges
    .debounceTime(1000)
    .distinctUntilChanged()
    .subscribe(va => {

      if ( this.lastSearchVal != va) {
        this.lastSearchVal = va;
        this.searchItems = [];
        this.pageIndex = 0;
        this.initialBindCommunitiesList();
        this.communitiesLoadedEmptySearh = false;
      }

    });

    console.log("My Communities View Loaded");


  }

  addCommunities() {
    this.navCtrl.push(CommunityPage);
  }

}
