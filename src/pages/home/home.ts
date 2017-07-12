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

  email: string;
  password: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private firebase: Firebase, private afAuth: AngularFireAuth) {
    console.log('se connecter avec: admin@admin.fr   mdp: admin1');
    console.log('ou avec: livreur@livreur.fr   mdp: livreur');
  }

  

  connexion() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
    // Handle Errors here.
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
    })
    .then((result) => {
      this.navCtrl.push(AccueilPage);
      alert('Vous êtes bien connecté !'); 
    });
  }

  deconnexion() {
    firebase.auth().signOut()
    .then(function() {
      // Sign-out successful.
      alert('Vous avez bien été déconnecté !');
    })
    .catch(function(error) {
      // An error happened.
    });
  }


}
