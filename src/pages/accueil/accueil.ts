import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Firebase } from '@ionic-native/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'; 


@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

  reference: number;
  designation: string;
  quantite: number;
  poids: number;
  prix: number;
  expediteur: string; 
  destinataire: string; 

  constructor(public navCtrl: NavController , private firebase: Firebase, private afAuth: AngularFireAuth ) {

    /* var userId = firebase.auth().currentUser.uid;
    console.log(userId);
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = snapshot.val().username;
      console.log(username);
    });  */

  }
    
  public setObject(): void {
    console.log('reference : ' + this.reference);
    console.log('designation : ' + this.designation);
    console.log('quantite : ' + this.quantite);
    console.log('poids : ' + this.poids);
    console.log('prix : ' + this.prix);
    console.log('expediteur : ' + this.expediteur);
    console.log('destinataire : ' + this.destinataire);

    alert('La référence n° ' + this.reference + ' à bien été ajoutée !' +
          ' designation : ' + this.designation + 
          ' quantite : ' + this.quantite +
          ' poids : ' + this.poids + 
          ' prix : ' + this.prix +
          ' expediteur : ' + this.expediteur +
          ' destinataire : ' + this.destinataire);
  }


}