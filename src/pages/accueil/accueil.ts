import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';
import firebase from 'firebase';


// Pages
import { RamassagePage } from '../ramassage/ramassage';
import { EchangePage } from '../echange/echange';
import { LivraisonPage } from '../livraison/livraison';
import { InventairePage } from '../inventaire/inventaire';
import { HomePage } from '../home/home';

// modèle pour User
class User {
  username:string;
  mail:string;
}

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
  providers: [UtilisateurProvider]
})
export class AccueilPage {

  // le profil de l'utilistateur
  user: Object;
  // indiquer à la vue si les données sont chargée.
  profileLoaded:boolean = false;

  constructor(public navCtrl: NavController, private utilisateurProvider: UtilisateurProvider) {

  
     this.getUserName(firebase.auth().currentUser.uid);

  }

  getUserName(userId) {
    this.utilisateurProvider.getUser(userId).then(snapshot => {
      this.user = snapshot.val() as User;
      console.log('username: '+ this.user);
     this.profileLoaded = true; 
    });
  }

  logout() {
    this.utilisateurProvider.deconnexion().then( (rep) => {
      this.navCtrl.setRoot(HomePage);
    });
  }

  addBL() {
    let thisClass = this; 
    thisClass.navCtrl.push(RamassagePage);
  };

  updateBL() {
    let thisClass = this; 
    thisClass.navCtrl.push(EchangePage);
  };

  deleteBL() {
    let thisClass = this; 
    thisClass.navCtrl.push(LivraisonPage);
  };

  showBL() {
    let thisClass = this; 
    thisClass.navCtrl.push(InventairePage);
  };

}
