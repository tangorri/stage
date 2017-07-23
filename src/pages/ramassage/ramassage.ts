import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';
import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Pages
import { AccueilPage } from '../accueil/accueil';

// modèle pour Marchandise
class Marchandise {
  reference:number;
  designation:string;
  quantite:number;
  poids:number;
  prix:number;
  expediteur:string;
  destinataire:string;
}

// modèle pour Clients
class Client {
  nom:string;
  adresse:string;
  code_postal:number;
  ville:string;
}

@Component({
  selector: 'page-ramassage',
  templateUrl: 'ramassage.html',
  providers: [UtilisateurProvider]
})

export class RamassagePage {

  // le modèle des marchandises
  marchandise: FirebaseListObservable<any>;
  // le modèle des clients
  client: FirebaseListObservable<any>;

  reference:number;
  designation:string;
  quantite:number;
  poids:number;
  prix:number;
  expediteur:string;
  destinataire:string;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, private utilisateurProvider: UtilisateurProvider) {

    var user = firebase.auth().currentUser.uid;
    this.marchandise = dbAf.list('/users/' + user + '/cargaison/');
    
  }

  saveBL() {
    var newBL = {
      "reference": this.reference,
      "designation": this.designation,
      "quantite": this.quantite,
      "poids": this.poids,
      "prix": this.prix,
      "expediteur": this.expediteur,
      "destinataire": this.destinataire
    }
    this.marchandise.push(newBL).then( res => {
      this.reference = null;
      this.designation = null;
      this.quantite = null;
      this.poids = null;
      this.prix = null;
      this.expediteur = null;
      this.destinataire = null;
      alert('Bon de livraison ajouté avec succés');
      this.navCtrl.setRoot(AccueilPage)
    }).catch(e => {
      console.log('Une erreur est survenue');
    });
  }


}
