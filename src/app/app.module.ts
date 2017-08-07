import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { AccueilPage } from '../pages/accueil/accueil';
import { RamassagePage } from '../pages/ramassage/ramassage';
import { LivraisonPage } from '../pages/livraison/livraison';
import { EchangePage } from '../pages/echange/echange';
import { ClientsPage } from '../pages/clients/clients';
import { InventairePage } from '../pages/inventaire/inventaire';
import { TabsPage } from '../pages/tabs/tabs';
import { SignatureModalPage } from '../pages/signature-modal/signature-modal';

// Native components
import { AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Firebase } from '@ionic-native/firebase';

// AngulireFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Connexion Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDP8kdmMVaJ_HY6XZu75AsKcWnAaiTdAN8",
  authDomain: "etcheverry-hariscain.firebaseapp.com",
  databaseURL: "https://etcheverry-hariscain.firebaseio.com",
  storageBucket: "etcheverry-hariscain.appspot.com",
  messagingSenderId: '1053939384333'
};

// Services
import { Loader } from '../providers/loader/loader'
import { UtilisateurProvider } from '../providers/utilisateur/utilisateur';
import { SignaturePadModule } from 'angular2-signaturepad';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccueilPage,
    RamassagePage,
    LivraisonPage,
    EchangePage,
    ClientsPage,
    InventairePage,
    TabsPage,
    SignatureModalPage,
    Loader
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SignaturePadModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccueilPage,
    RamassagePage,
    LivraisonPage,
    EchangePage,
    ClientsPage,
    InventairePage,
    TabsPage,
    SignatureModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AlertController,
    Loader,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilisateurProvider,
  ]
})
export class AppModule {}
