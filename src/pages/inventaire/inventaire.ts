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
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

// Pages
import { EchangePage } from "../echange/echange";


//Modèles
import { Marchandise } from '../../modeles/marchandise.modele';
import { Client } from '../../modeles/client.modele';
import { ChauffeursComponent } from "../../components/chauffeurs/chauffeurs";

@Component({
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html',
  providers: [UtilisateurProvider],
  entryComponents: [ChauffeursComponent]
})

export class InventairePage {
  marchandiseChange: any;
  user: string;
  marchandiseBinding: any;
  chauffeur2: any= {};
  chauffeurName: any;

  marchandise: any;
  client: any;
  clientName: string;
  clientAdress: string;
  signatureImage: string;

  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireOfflineDatabase, public loader: Loader, private utilisateurProvider: UtilisateurProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, public navParams: NavParams ) {

    this.signatureImage = navParams.get('signatureImage');
    this.user = firebase.auth().currentUser.uid;
    this.marchandise = dbAf.list('/users/' + this.user + '/cargaison/');

    this.client = dbAf.list('/clients/', { preserveSnapshot: true });
    this.client.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.clientName = snapshot.key;
        this.client = snapshot.val as Client;
        /* console.log(this.client); */
      });
    });

  }

  echanger(key:string) {
    let myModal = this.modalCtrl.create(ChauffeursComponent);
    myModal.onDidDismiss(res => {
      if(res) {
        this.chauffeur2 = {
          name:res.username,
          id:res.$key
        };
        this.chauffeurName = this.chauffeur2.name;
        console.log("Nom du 2eme chauffeur: ",this.chauffeur2.name);
        this.marchandise.update(key,{echange: this.chauffeur2});
      }
    })
    myModal.present();
  }

  openModal(key:string) {
    let myModal = this.modalCtrl.create(SignatureModalPage, {key:key});
    myModal.present();
  }; 


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

/*   modifier(key:string) {
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
  };  */

  geoloc(key:string) {
    console.log('geoloc');
  }; 

}