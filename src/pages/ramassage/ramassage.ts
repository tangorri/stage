import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  selector: 'page-ramassage',
  templateUrl: 'ramassage.html'
})
export class RamassagePage {

  // le modèle des marchandises
  marchandise: FirebaseListObservable<any>;
  reference: number;
  designation: string;
  quantite: number;
  poids: number;
  prix: number;
  expediteur: string; 
  destinataire: string;

  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase) {

      /* const Marchandise = this.dbAf.object('/marchandise');
      console.log(Marchandise); 
      
      Marchandise.push({ 
        reference: this.reference,
        designation: this.designation,
        quantite: this.quantite,
        poids: this.poids,
        prix: this.prix,
        expediteur: this.expediteur,
        destinataire: this.destinataire
      }); */
  }

}
