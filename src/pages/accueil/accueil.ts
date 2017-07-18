import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

// Pages
import { RamassagePage } from '../ramassage/ramassage';
import { EchangePage } from '../echange/echange';
import { LivraisonPage } from '../livraison/livraison';
import { InventairePage } from '../inventaire/inventaire';

// modèle pour User
class User {
  username:string;
  mail:string;
}

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

  // le profil de l'utilistateur
  user:Object;
  // indiquer à la vue si les données sont chargée.
  profileLoaded:boolean = false;

  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase ) {

    var userId = afAuth.auth.currentUser.uid;
    console.log('userId: '+userId);

    dbAf.database.ref('/users/'+ userId).once('value').then((snapshot) => {
      // @TODO à placer dans un Service pour le rendre accessible globalement
      // dans  aufAuth.auth.currentUser par exemple ?
      this.user = snapshot.val() as User;
      console.log('username: '+ this.user);
      this.profileLoaded = true;
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
