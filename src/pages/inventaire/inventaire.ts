import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

// Services
import { Loader } from '../../services/loader/loader';
import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';

// Firebase
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Pages
import { EchangePage } from "../echange/echange";


//Modèle
import { Marchandise } from '../../modeles/marchandise.modele';

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
  marchandise: any;
  // le modèle des clients
  client: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, public loader: Loader, private utilisateurProvider: UtilisateurProvider, public alertCtrl: AlertController) {

    var user = firebase.auth().currentUser.uid;
    this.marchandise = dbAf.list('/users/' + user + '/cargaison/');
    
  }

  suppr(key:string) {
    // Confirmer la suppression
    let confirm = this.alertCtrl.create({
      title: 'SUPPRIMER',
      message: 'La suppression sera définitive, êtes vous vraiment sûr de vouloir supprimer ce bon de livraison ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            // Supprimer de firebase
            this.marchandise.remove(key).then(snapshot => {
              alert( "Ce bon de livraison à bien été supprimé");
            })
            .catch(error => {
              console.log( "Une erreur est survenue !");
            });
          }
        }
      ]
    });
    confirm.present();
  }; 

  modifier(key:string) {
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
            // Rediriger vers formulaire de modification
            this.navCtrl.push(EchangePage, {key:key});
          }
        }
      ]
    });
    confirm.present();
  }; 


  /* modifier(key:string) {
    this.marchandise.update(key).then(snapshot => {
      console.log( "Ce bon de livraison n°" + this.marchandise.reference + "à bien été modifié");
    })
    .catch(error => {
      console.log( "Une erreur est survenue !");
    }) */


}




