import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommunityService } from '../../providers/community-service';
import { UserService } from '../../providers/user-service';
import { Community } from '../../interfaces/community';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


import {CommunityPage} from '../../pages/community/community';



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


  searchVal: string;
  searchItems = [];
  searchInput = new FormControl();




  ngOnInit(): void {
    this.searchInput.valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(va => {
        
        this.bindCommunitiesList();
      });
  }


  public bindCommunitiesList() {

    this.searchItems = [];

    if (this.searchVal == undefined)
      this.searchVal = '';

    this._userService.getLoggedinInUser().subscribe(s => {
      let userID = s.ID;

      this._searchService.GetAllCommunities(this.searchVal, userID)
        .subscribe(sub => {
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
              isMember: element.isMember
            };

            this.searchItems.push(community);
          });
        });
    });
  }

  userJoinedCommunity(data){

    if(data && data.communityID && data.isMember){
      this.searchItems.forEach(item=>{
        if(item.id == data.communityID){          
          item.isMember = data.isMember == "true"? "false" : "true"          
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

  ionViewDidLoad() {

  }

  addCommunities(){
    this.navCtrl.push(CommunityPage);
  }

}
