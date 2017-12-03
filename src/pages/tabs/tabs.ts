import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CommunityPage } from '../community/community';
import { LiveFeed } from '../live-feed/live-feed';
import { EventFeedPage } from '../event-feed/event-feed';
import { MyCommunitiesPage } from '../my-communities/my-communities';
import { UserSearchComponent } from '../user-search-component/user-search-component';
import {  NotificationsPage} from '../notifications/notifications';
import { Firebase } from '@ionic-native/firebase';

import { Platform } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public notifications = [];
  public commentCount:number = 0;

  tab0Root = LiveFeed;
  tab1Root = MyCommunitiesPage;
  tab2Root = EventFeedPage;
  tab3Root = NotificationsPage;

  constructor(
    private firebaseIonic: Firebase,
    private platform: Platform
  ) {
    this.onNotification();
  }


  async onNotification() {
    try {

      let notificationsString = sessionStorage.getItem("userNotification");

      if (notificationsString != null && notificationsString.length > 3) {
        this.notifications = JSON.parse(notificationsString);
      }

      await this.platform.ready();

      this.firebaseIonic.onNotificationOpen().subscribe(sub => {
        console.log("Notification Opened");
        console.log(sub);
        this.notifications.push(sub);

        sessionStorage.setItem("userNotification", JSON.stringify(this.notifications));

        console.log("Tabs -- Saving Notifications");
        console.log("Length: "  + this.notifications.length);
        console.log("Notification - " + JSON.stringify(this.notifications));

        this.commentCount = this.notifications.length;
        
      });
    }
    catch (e) {
      console.log('erroring');
      console.log(e)
    }
  }

}
