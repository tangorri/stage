import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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

@Component({
  selector: 'page-livraison',
  templateUrl: 'livraison.html',
  providers: [UtilisateurProvider]
})
export class LivraisonPage {

  // le modèle des marchandises
  marchandise: FirebaseListObservable<any>;

  reference:number;
  designation:string;
  quantite:number;
  poids:number;
  prix:number;
  expediteur:string;
  destinataire:string;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, private utilisateurProvider: UtilisateurProvider) {

    this.marchandise = dbAf.list('/marchandise');

  }

  supprBL() {
    console.log('coucou je ne suis pas encore programmé !');

  }
}