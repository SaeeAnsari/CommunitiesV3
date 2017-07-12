import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {UserService} from '../../providers/user-service';

/**
 * Generated class for the UserSearchItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-search-item-component',
  templateUrl: 'user-search-item-component.html',
  providers: [UserService]
})
export class UserSearchItemComponent implements OnInit{

  @Input() ID = 0;
  @Input() Name = "";
  @Input() Image = "";
  @Input() AlreadyMember = "";
  @Input() CommunityID = -1;
  @Output() UserAction = new EventEmitter();


  private selected: boolean = false;


  constructor(private _userService: UserService) {

  
  }

  ngOnInit() {

  }

  public displayCheckmark() {
    if (this.selected)
      return 'glyphicon glyphicon-ok';
    else return '';
  }

  public userSelected() {
    this.selected = !this.selected;

    this._userService.AddUsertoCommunity(this.ID, +this.CommunityID);

  }


  addUserToCommunity(){

    if(+this.CommunityID > 0){
       this._userService.getLoggedinInUser().subscribe(sub => {

      let userID: number = sub.ID;

      this._userService.AddUsertoCommunity(this.ID, this.CommunityID).subscribe(sub => {        
        this.UserAction.emit();
      });
    });
  }
  
  return false;

  }

  removeUserFromCommunity(){
    if(+this.CommunityID > 0){
       this._userService.getLoggedinInUser().subscribe(sub => {

      let userID: number = sub.ID;

      this._userService.RemoveUserFromCommunity(this.ID, this.CommunityID).subscribe(sub => {        
        this.UserAction.emit();
      });
    });
  }
  
  return false;
  }
}
