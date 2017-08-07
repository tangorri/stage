import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { SignatureModalPage } from '../signature-modal/signature-modal';

// Services
import { Loader } from '../../providers/loader/loader';
import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';

// Firebase
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Pages
import { EchangePage } from "../echange/echange";


//Modèle
import { Marchandise } from '../../modeles/marchandise.modele';
import { Client } from '../../modeles/client.modele';

@Component({
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html',
  providers: [UtilisateurProvider]
})

export class InventairePage {
  // Modèles
  marchandise: any;
  client: any;
  clientName: string;
  clientAdress: string;
  signatureImage: string;

  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, public loader: Loader, private utilisateurProvider: UtilisateurProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, public navParams: NavParams) {

    var user = firebase.auth().currentUser.uid;
    this.marchandise = dbAf.list('/users/' + user + '/cargaison/');

    this.client = dbAf.list('/clients/', { preserveSnapshot: true });
    this.client.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.clientName = snapshot.key;
        this.client = snapshot.val() as Client;
        this.clientAdress = this.client.adresse + ', ' + this.client.codePostal + ' ' + this.client.ville;
        console.log(this.client);
        console.log("nom: "+this.clientName);
        console.log("adresse: "+this.clientAdress);
        
      });
    });

    this.signatureImage = navParams.get('signatureImage');
    
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

  openModal(key:string) {
    let myModal = this.modalCtrl.create(SignatureModalPage);
    myModal.present();
  }; 

  geoloc(key:string) {
    console.log('geoloc');
  }; 





}




