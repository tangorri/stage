import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

// Services
import { Loader } from '../../providers/loader/loader';
import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';

// Firebase
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

// Pages, Components
import { EchangePage } from "../echange/echange";
import { SignatureModalPage } from '../signature-modal/signature-modal';
import { ChauffeursComponent } from "../../components/chauffeurs/chauffeurs";
import { GoogleMapComponent } from "../../components/google-map/google-map";

//Modèles
import { Marchandise } from '../../modeles/marchandise.modele';
import { Client } from '../../modeles/client.modele';

@Component({
  selector: 'page-inventaire',
  templateUrl: 'inventaire.html',
  providers: [UtilisateurProvider],
  entryComponents: [ChauffeursComponent, GoogleMapComponent]
})

export class InventairePage {
  marchandiseChange: any;
  user: string;
  marchandiseBinding: any;
  chauffeur2: any= {};
  chauffeurName: any;

  marchandise: any;
  marchandiseLivree: any;
  client: any;
  clientName: string;
  clientAdress: string;
  clientCoords: string;
  signatureImage: string;
  adress: string;

  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireOfflineDatabase, public loader: Loader, private utilisateurProvider: UtilisateurProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, public navParams: NavParams ) {

    this.signatureImage = navParams.get('signatureImage');
    this.user = firebase.auth().currentUser.uid;
    //Marchandise
    this.marchandise = dbAf.list('/users/' + this.user + '/cargaison/', {
      query:{
        orderByChild: 'delivered',
        equalTo: false
      }
    });
    this.marchandise.subscribe(queryMarchandise => {
      console.log('query : ',queryMarchandise); 
    });

    this.marchandiseLivree = dbAf.list('/users/' + this.user + '/cargaison/', {
      query:{
        orderByChild: 'delivered',
        equalTo: true
      }
    });
    this.marchandiseLivree.subscribe(queryMarchandise => {
      console.log('marchandiseLivree : ',queryMarchandise); 
    });

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

  signature(key:string) {
    let myModal = this.modalCtrl.create(SignatureModalPage, {key:key});
    myModal.present();
  }; 

  geoloc(key:string) {
    let myAdress = this.dbAf.list('/users/' + this.user + '/cargaison/' + key + '/destinataire/');
    myAdress.subscribe(res => {
      this.clientCoords = res[2].$value + ', ' + res[3].$value;
      console.log('LatLng: ', this.clientCoords);
      this.clientAdress = res[4].$value + ', ' + res[0].$value + ', ' + res[1].$value + ', ' + res[6].$value;
    });
    let myModal = this.modalCtrl.create(GoogleMapComponent, {adress: this.clientAdress, latLng: this.clientCoords});
    myModal.present();
  }; 
  
  /* suppr(key:string) {
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
  }; */ 
  
  
}