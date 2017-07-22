import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AccueilPage } from '../pages/accueil/accueil';
import { HomePage } from '../pages/home/home';

import firebase from 'firebase';


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        // Database Config
    const firebaseConfig = {
      apiKey: "AIzaSyDP8kdmMVaJ_HY6XZu75AsKcWnAaiTdAN8",
      authDomain: "etcheverry-hariscain.firebaseapp.com",
      databaseURL: "https://etcheverry-hariscain.firebaseio.com",
      storageBucket: "etcheverry-hariscain.appspot.com",
      messagingSenderId: '1053939384333'
    };
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.rootPage = TabsPage;
      } 
      else {
        this.rootPage = HomePage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
