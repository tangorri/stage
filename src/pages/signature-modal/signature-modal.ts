import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { InventairePage } from "../inventaire/inventaire";

//Modèle
import { Marchandise } from '../../modeles/marchandise.modele';

import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';

import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, private utilisateurProvider: UtilisateurProvider) {

    // On récupère l'id de l'utilisateur en cours
    this.user = firebase.auth().currentUser.uid;

    // On récupère l'id du bon de livraison à modifier
    this.key = navParams.get("key");

    // On se connecte à la base de donnée sur l'élément à modifier
    this.marchandise = dbAf.list('/users/' + this.user + '/cargaison/');
    this.delivered = dbAf.list('/delivered/');

    
  }


  drawCancel() {
    this.navCtrl.setRoot(InventairePage);
  }

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.marchandise.update(this.key,{signature: this.signatureImage, dateLivraison:Date.now()});
    this.navCtrl.setRoot(InventairePage, {signatureImage: this.signatureImage});
  }

  drawClear() {
    this.signaturePad.clear();
  }


}
