import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AccueilPage } from '../accueil/accueil';

import { AlertController } from 'ionic-angular';

import { Firebase } from '@ionic-native/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name: string;
  email: string;
  password: string;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private firebase: Firebase, public afAuth: AngularFireAuth) {
    console.log('se connecter avec: admin@admin.fr   mdp: admin1');
    console.log('ou avec: livreur@livreur.fr   mdp: livreur');
  }

  connexion() {
     let thisClass = this; 
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((result) => {
      /* thisClass.navCtrl.push(AccueilPage); */
      console.log('Vous êtes bien connecté !'); 
      thisClass.navCtrl.push(AccueilPage);
    },
    function(e) {
      console.log('n\'existe pas');
    });
  }

  deconnexion() {
    firebase.auth().signOut()
    .then(function() {
      // Sign-out successful.
      console.log('Vous avez bien été déconnecté !');
    })
    .catch(function(error) {
      // An error happened.
    });
  }


}
