import { Pro } from '@ionic/pro';
import { Injectable, Injector, NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import {ComponentsModule} from '../components/components.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CloudModule, CloudSettings } from '@ionic/cloud-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook } from '@ionic-native/facebook';
import { ImagePicker } from '@ionic-native/image-picker';
import { Keyboard } from '@ionic-native/keyboard';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Deeplinks } from '@ionic-native/deeplinks';
import { Firebase } from '@ionic-native/firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { TabsPage } from '../pages/tabs/tabs';
import { CommunityModule } from '../pages/community/community.module';
import { LiveFeedModule } from '../pages/live-feed/live-feed.module';
import { MyCommunitiesPageModule } from '../pages/my-communities/my-communities.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { UserSearchComponentModule } from '../pages/user-search-component/user-search-component.module';
import { UserLocationModule } from '../pages/user-location/user-location.module';
import { LoginModule } from '../pages/login/login.module';
import { OpenGraphServiceProvider } from '../providers/open-graph-service/open-graph-service';
import { GeoProviderServiceProvider } from '../providers/geo-provider-service/geo-provider-service';
import { BaseLinkProvider } from '../providers/base-link/base-link';
import { ErrorLogServiceProvider } from '../providers/error-log-service/error-log-service';
import { FacebookApiProvider } from '../providers/facebook-api/facebook-api';
import { EventFeedPageModule } from '../pages/event-feed/event-feed.module';
import { EventProvider } from '../providers/event/event';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { CameraPluginProvider } from '../providers/camera-plugin/camera-plugin';
import { HelperProvider } from '../providers/helper/helper';
import { IonicStorageModule } from '@ionic/storage';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';


/*
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'bb16c680'
  },
  'auth': {
    'facebook': {
      'scope': ['permission1', 'permission2']
    }
  }
}*/

Pro.init('caa89fcc', {
  appVersion: '0.0.1'
});

@Injectable()
export class CommunitiesErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch (e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}




@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    //CloudModule.forRoot(cloudSettings),
    ComponentsModule,
    IonicStorageModule.forRoot(),
    CommunityModule,
    LiveFeedModule,
    MyCommunitiesPageModule,
    SettingsPageModule,
    UserSearchComponentModule,
    UserLocationModule,
    LoginModule,
    NotificationsPageModule,
    EventFeedPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    Deeplinks,
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
    HelperProvider,
    Firebase,
    GooglePlus,
    LaunchNavigator,
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: CommunitiesErrorHandler }]
  ]
})
export class AppModule { }
