import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

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
  marchandise: FirebaseObjectObservable<any>; 
  reference: number;
  designation: string;
  quantite: number;
  poids: number;
  prix: number;
  expediteur: string; 
  destinataire: string;

  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase) {

    const marchandise = dbAf.object('/marchandise');
    console.log(marchandise);
    
  }

  save(newRef: number) {
    /* let thisClass = this; */
    this.marchandise.set({ reference: newRef });
  }


}
