import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Loader } from '../../services/loader/loader';

import firebase from 'firebase';
import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// modèle pour Marchandises
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
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html',
  providers: [UtilisateurProvider]
})

export class InventairePage {
  // le modèle des marchandises
  marchandise: FirebaseListObservable<any>;
  // le modèle des clients
  client: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, public loader: Loader, private utilisateurProvider: UtilisateurProvider ) {

    this.marchandise = dbAf.list('/marchandise');
    
  }

}
