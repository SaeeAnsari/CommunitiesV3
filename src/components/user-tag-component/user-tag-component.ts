import { Component , OnInit, Input} from '@angular/core';

/**
 * Generated class for the UserTagComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'app-user-tag',
  templateUrl: 'user-tag-component.html'
})
export class UserTagComponent implements OnInit {

  @Input() ID: number;
  @Input() PostDate:Date;
  @Input() Name: string;
  @Input() ImageURL:string;

  constructor() { }

  ngOnInit() {

    console.log(this.ID);
    console.log(this.ImageURL);
    
  }

  externalLoadUser(userID: number, displayName: string, ImageURL: string){
    this.ID = userID;
    this.Name = displayName;
    this.ImageURL = ImageURL;
  } 
}