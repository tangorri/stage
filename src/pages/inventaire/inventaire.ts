import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


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
  templateUrl: 'inventaire.html'
})

export class InventairePage {
  // le modèle des marchandises
  marchandise: FirebaseListObservable<any>;
  // le modèle des clients
  client: FirebaseListObservable<any>;

  // indiquer à la vue si les données sont chargée.
  inventaireLoaded:boolean = false;

  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase) {

    this.marchandise = dbAf.list('/marchandise');
    this.client = dbAf.list('/clients');
    
    setTimeout(() => { 
      this.inventaireLoaded = true;
      }, 2000);
     

  }

}
