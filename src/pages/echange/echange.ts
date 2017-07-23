import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';
import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';

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
  selector: 'page-echange',
  templateUrl: 'echange.html',
  providers: [UtilisateurProvider]
})
export class EchangePage {

  
  modifierUnBon: boolean = false;

  toUpdate: number;
  reference:number;
  designation:string;
  quantite:number;
  poids:number;
  prix:number;
  expediteur:string;
  destinataire:string;

  // le modèle des marchandises
  marchandise: FirebaseListObservable<any>;

  constructor( public navCtrl: NavController, private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, private utilisateurProvider: UtilisateurProvider) {

    this.marchandise = dbAf.list('/marchandise');

  }

  // Affichage formulaire du BL a modifier
  // avec champs préremplis
  /* chooseBL() {
    var $key: string;
    console.log($key)
    this.modifierUnBon = true;
  } */

/*   // Effectuer la modif
  updateBL() {
    var newBL = {
      "reference": this.reference,
      "designation": this.designation,
      "quantite": this.quantite,
      "poids": this.poids,
      "prix": this.prix,
      "expediteur": this.expediteur,
      "destinataire": this.destinataire
    }
    this.marchandise.update(newBL, newBL).then( res => {
      alert('Bon de livraison modifié avec succés');

    }).catch(e => {
      console.log('Une erreur est survenue');
    });
  } */

}
