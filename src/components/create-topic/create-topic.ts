import { Component, Input } from '@angular/core';
import { CommunityService } from '../../providers/community-service';
import { ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import {LiveFeed} from '../../pages/live-feed/live-feed';

/**
 * Generated class for the CreateTopicComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'create-topic',
  templateUrl: 'create-topic.html',
  providers: [CommunityService]
})

export class CreateTopicComponent {
 

  @Input() CommunityID:number=0;
  private topicName: string = '';

  public topicForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private viewController: ViewController,
    private navParams: NavParams,
    private _communityService: CommunityService
  ) {

    this.topicForm = this._fb.group({
      topicName: ['', [<any>Validators.required, <any>Validators.minLength(2),<any>Validators.maxLength(100) ]]
    });

    


    if (this.navParams.get("CommunityID")) {
      this.CommunityID = this.navParams.get("CommunityID");
    }
  }

  createTopic(model, isValid: boolean) {

    if (this.CommunityID > 0) {
      this._communityService.CreateTopic(this.CommunityID, this.topicName).subscribe(sub=>{
        if(sub >0){          
          this.viewController.dismiss({CommunityID: this.CommunityID});
        }
      });
    }
  }
}
