import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';

import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

//Pages
import { InventairePage } from '../inventaire/inventaire';

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


  reference:string = " ";
  designation:string = " ";
  quantite:string = " ";
  poids:string = " ";
  prix:string = " ";
  expediteur:string = " ";
  destinataire:string = " ";
  key:string = " ";
  user:string = " ";

  // le modèle des marchandises
  marchandise: FirebaseListObservable<any>;

  constructor( public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, private utilisateurProvider: UtilisateurProvider) {

      this.key = navParams.get("key");
      console.log("key:"+this.key);

      var user = firebase.auth().currentUser.uid;

      this.marchandise = dbAf.list('/users/' + user + '/cargaison/', {
        query : {
          equalTo: this.key
        }
      });


      /* var bl = this.marchandise.forEach */
      console.log("ref: ");
  }
    updateBL() {
          // Confirmer la modif
    let confirm = this.alertCtrl.create({
      title: 'MODIFIER',
      message: 'Voulez vous bien modifier ce bon ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Modifier',
          handler: () => {
            var newBL = {
              "reference": this.reference,
              "designation": this.designation,
              "quantite": this.quantite,
              "poids": this.poids,
              "prix": this.prix,
              "expediteur": this.expediteur,
              "destinataire": this.destinataire,
              "chauffeurId": this.user
            }
            //Modifier le bon
            this.marchandise.update(this.key, newBL).then(res => {
              alert("Le bon à bien été modifié");
            }).catch(e => {
              console.log("Une erreur est survenue");
            })
          }
        }
      ]
    });
    confirm.present();
    }
  
  


}
