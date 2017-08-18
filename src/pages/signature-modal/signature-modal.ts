import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { InventairePage } from "../inventaire/inventaire";

//Modèle
import { Marchandise } from '../../modeles/marchandise.modele';

import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';

import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-signature-modal',
  templateUrl: 'signature-modal.html',
})
export class SignatureModalPage {

  marchandise: any;
  delivered:any;
  key: string;
  user: any;
  signatureImage : string;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };


  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, private afAuth: AngularFireAuth, private dbAf: AngularFireOfflineDatabase, private utilisateurProvider: UtilisateurProvider) {

    // On récupère l'id de l'utilisateur en cours
    this.user = firebase.auth().currentUser.uid;

    // On récupère l'id du bon de livraison à modifier
    this.key = navParams.get("key");

    // On se connecte à la base de donnée sur l'élément à modifier
    this.marchandise = dbAf.list('/users/' + this.user + '/cargaison/');
    this.delivered = dbAf.list('/delivered/');

    
  }


  drawCancel() {
    this.viewCtrl.dismiss();
  }

  drawComplete() {

    
      // Confirmer la livraison
      let confirm = this.alertCtrl.create({
        title: 'Livraison effectuée',
        message: 'Etes vous sûr de vouloir identifier cette livraison comme livrée ?',
        buttons: [
          {
            text: 'Annuler',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Valider',
            handler: () => {
              this.signatureImage = this.signaturePad.toDataURL();
              this.marchandise.update(this.key,{signature: this.signatureImage, dateLivraison:Date.now(), delivered: true, chauffeurLivraison: this.user});
              this.navCtrl.setRoot(TabsPage, {tabIndex: 3, signatureImage: this.signatureImage});
            }
          }
        ]
      });
      confirm.present();
  }

  drawClear() {
    this.signaturePad.clear();
  }


}
