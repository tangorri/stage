import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

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
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html'
})
export class InventairePage {

  // le modèle des marchandises
  marchandise:Object;
  // indiquer à la vue si les données sont chargée.
  inventaireLoaded:boolean = false;

  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase) {

  }

}
