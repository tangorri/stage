import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';

import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

//Pages
import { InventairePage } from '../inventaire/inventaire';
import { AccueilPage } from '../accueil/accueil';

//Modèle
import { Marchandise } from '../../modeles/marchandise.modele';

@Component({
  selector: 'page-echange',
  templateUrl: 'echange.html',
  providers: [UtilisateurProvider]
})
export class EchangePage {

  // le modèle des marchandises
  marchandise: FirebaseObjectObservable<any>;
  key:string;
  user:any;
  marchandiseBinding : object;


  constructor( public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, private utilisateurProvider: UtilisateurProvider) {

    // On récupère l'id de l'utilisateur en cours
    this.user = firebase.auth().currentUser.uid;
    console.log(this.user);

    // On récupère l'id du bon de livraison à modifier
    this.key = navParams.get("key");
    console.log("key:"+this.key);

    // On se connecte à la base de donnée sur l'élément à modifier
    this.marchandise = dbAf.object('/users/' + this.user + '/cargaison/' + this.key);
    this.marchandise.subscribe(res => {
      this.marchandiseBinding = res as Marchandise;
    });

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

            //Modifier le bon
            this.marchandise.update(this.marchandiseBinding).then(res => {
              alert("Le bon à bien été modifié");
              this.navCtrl.setRoot(AccueilPage);
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
