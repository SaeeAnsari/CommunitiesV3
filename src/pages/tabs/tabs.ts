import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {CommunityPage} from '../community/community';
import {LiveFeed} from '../live-feed/live-feed';
import {EventFeedPage} from '../event-feed/event-feed';
import {MyCommunitiesPage} from '../my-communities/my-communities';
import {UserSearchComponent} from '../user-search-component/user-search-component';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab0Root = LiveFeed;
  tab1Root = MyCommunitiesPage;
  tab2Root = EventFeedPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
