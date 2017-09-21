import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CloudModule, CloudSettings } from '@ionic/cloud-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {Facebook} from '@ionic-native/facebook';
import {ImagePicker} from '@ionic-native/image-picker';
import {Keyboard} from '@ionic-native/keyboard';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CommunityPage } from '../pages/community/community';
import { LiveFeed } from '../pages/live-feed/live-feed';
import { MyCommunitiesPage } from '../pages/my-communities/my-communities';

import {SettingsPage} from '../pages/settings/settings';


import { MarkerNewPostComponent } from '../components/marker-new-post-component/marker-new-post-component';
import { UserCommentsComponent } from '../components/user-comments-component/user-comments-component';
import { UserPostActionComponent } from '../components/user-post-action-component/user-post-action-component';
import { UserPostsComponent } from '../components/user-posts-component/user-posts-component';
import { UserTagComponent } from '../components/user-tag-component/user-tag-component';


import { UserSearchComponent } from '../pages/user-search-component/user-search-component';
import { UserSearchItemComponent } from '../components/user-search-item-component/user-search-item-component';
import { NewCommentComponent } from '../components/new-comment-component/new-comment-component';

import { LoginComponent } from '../components/login-component/login-component';
import { RegisterUserComponent } from '../components/register-user-component/register-user-component';

import { UserLocation } from '../pages/user-location/user-location';


import { Login } from '../pages/login/login';
import { CommunityItemComponent } from '../components/community-item/community-item';
import { OpenGraphServiceProvider } from '../providers/open-graph-service/open-graph-service';
import { GeoProviderServiceProvider } from '../providers/geo-provider-service/geo-provider-service';
import { BaseLinkProvider } from '../providers/base-link/base-link';
import { UploadedMediaPostComponent } from '../components/uploaded-media-post/uploaded-media-post';
import { ErrorLogServiceProvider } from '../providers/error-log-service/error-log-service';
import { FacebookApiProvider } from '../providers/facebook-api/facebook-api';
import {EventFeedPage} from '../pages/event-feed/event-feed';
import { NewEventComponent } from '../components/new-event/new-event';
import { EventProvider } from '../providers/event/event';
import { Camera } from '@ionic-native/camera';
import {MediaCapture} from '@ionic-native/media-capture';
import {FileTransfer}  from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { CameraPluginProvider } from '../providers/camera-plugin/camera-plugin';
import { HelperProvider } from '../providers/helper/helper';
import { IonicStorageModule } from '@ionic/storage';
import { ImageUploadComponent } from '../components/image-upload/image-upload';
import { VideoUploadComponent } from '../components/video-upload/video-upload';
import { LocalGalleryUploadComponent } from '../components/local-gallery-upload/local-gallery-upload';
import { SocialSharingPopoverComponent } from '../components/social-sharing-popover/social-sharing-popover';




const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'bb16c680'
  },
  'auth': {
    'facebook': {
      'scope': ['permission1', 'permission2']
    }
  }
}


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CommunityPage,
    UserSearchComponent,
    UserSearchItemComponent,
    LiveFeed,
    
    MarkerNewPostComponent,
    UserCommentsComponent,
    UserPostActionComponent,
    UserPostsComponent,
    UserTagComponent,
    NewCommentComponent,
    Login,
    LoginComponent,
    RegisterUserComponent,
    UserLocation,
    MyCommunitiesPage,
    CommunityItemComponent,
    SettingsPage,
    UploadedMediaPostComponent,
    EventFeedPage,
    NewEventComponent,
    ImageUploadComponent,
    VideoUploadComponent,
    LocalGalleryUploadComponent,
    SocialSharingPopoverComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CommunityPage,
    UserSearchComponent,
    LiveFeed,
    SocialSharingPopoverComponent,
    UserCommentsComponent,
    NewCommentComponent,
    Login,
    LoginComponent,
    RegisterUserComponent,
    UserLocation,
    MyCommunitiesPage,
    CommunityItemComponent,
    SettingsPage,
    EventFeedPage
  ],
  providers: [
    StatusBar,
    
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    OpenGraphServiceProvider,
    GeoProviderServiceProvider,
    BaseLinkProvider,
    ErrorLogServiceProvider,
    Facebook,
    FacebookApiProvider,
    EventProvider,
    Camera,
    Keyboard,
    ImagePicker,
    MediaCapture,
    FileTransfer,
    File,
    CameraPluginProvider,
    HelperProvider
  ]
})
export class AppModule { }
