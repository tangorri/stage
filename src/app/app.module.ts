import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { RamassagePage } from '../pages/ramassage/ramassage';
import { LivraisonPage } from '../pages/livraison/livraison';
import { EchangePage } from '../pages/echange/echange';
import { ClientsPage } from '../pages/clients/clients';
import { InventairePage } from '../pages/inventaire/inventaire';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RamassagePage,
    LivraisonPage,
    EchangePage,
    ClientsPage,
    InventairePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RamassagePage,
    LivraisonPage,
    EchangePage,
    ClientsPage,
    InventairePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
