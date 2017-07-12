import { Component , OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { User } from '../../interfaces/user';
import { Community } from '../../interfaces/community';
import { CommunityService } from '../../providers/community-service';

import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'



import {LiveFeed} from '../live-feed/live-feed';

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
 * Generated class for the UserSearchComponent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-search-component',
  templateUrl: 'user-search-component.html',
  providers: [UserService]
})
export class UserSearchComponent  implements OnInit {

  private communityID: number = -1;
  private subscription;
  private userItems: User[] = [];
  searchVal: string;
  searchInput = new FormControl();


  constructor(private userService: UserService,public navCtrl: NavController, public navParams: NavParams) {
   
    this.searchVal = "";
    if(navParams.get('communityID'))
    {
      this.communityID = navParams.get('communityID');     
    }
  }

  bindUserGrid() {

    this.userItems = [];

    if (this.searchVal == undefined)
      this.searchVal = '';

      

    this.userService.GetAllActiveUsers(this.searchVal, this.communityID)
      .subscribe(list => {

        list.forEach(element => {

          var user = {
            id: element.ID,
            firstName: element.FirstName,
            lastName: element.LastName,
            active: element.Active,
            authenticationPortalID: element.AuthenticationPortalID,
            imageURL: element.ImageURL,
            alreadyMember: element.AlreadyMember,
            email: element.Email
          };

          this.userItems.push(user);
        });

      });

  }

  ngOnInit() {
    
    this.searchInput.valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(va => {
        
        this.bindUserGrid();
      });
  }

   userAddedorRemoved(){
    this.bindUserGrid();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSearchComponent');
  }

  navigateToFeed(){
    this.navCtrl.push(LiveFeed);
  }
}
