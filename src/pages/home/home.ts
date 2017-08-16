import { Component, ViewChild } from '@angular/core';
import { NavController, Searchbar } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UtilisateurProvider]
})
export class HomePage {

  @ViewChild('searchbar') searchbar: Searchbar;

  email: string;


  constructor(public navCtrl: NavController, private utilisateurProvider: UtilisateurProvider) {

  }

  ionViewDidEnter() {
    setTimeout(res => {
      this.searchbar.setFocus();
    }, 100);
  }

  login() {
    this.utilisateurProvider.connexion(this.email).then(authData => {
      console.log('login !');
      this.navCtrl.setRoot(TabsPage)
    }, error => {
      console.log('erreur de connexion');
    }
    );
  }


}
