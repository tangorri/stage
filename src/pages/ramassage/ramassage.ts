import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import firebase from 'firebase';
import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Pages
import { AccueilPage } from '../accueil/accueil';


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
  selector: 'page-ramassage',
  templateUrl: 'ramassage.html',
  providers: [UtilisateurProvider]
})

export class RamassagePage {

  // le modèle des marchandises
  marchandise: FirebaseListObservable<any>;
  // le modèle des clients
  client: FirebaseListObservable<any>;

  marchandiseBinding : any;

  user:any;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, private utilisateurProvider: UtilisateurProvider) {

    this.user = firebase.auth().currentUser.uid;
    this.marchandise = dbAf.list('/users/' + this.user + '/cargaison/');
    
  }

   saveBL(bl) {

    this.marchandiseBinding = bl.value as Marchandise;
    this.marchandiseBinding.dateRamassage = Date.now();
    console.log(this.marchandiseBinding);
    for(let cle in this.marchandiseBinding) {
      if (this.marchandiseBinding[cle] === undefined) {
        delete this.marchandiseBinding[cle];
        console.log("coucou"+cle);
      }
    }

    this.marchandise.push(this.marchandiseBinding).then( res => {
      alert('Bon de livraison ajouté avec succés');
      this.navCtrl.setRoot(AccueilPage)
    }).catch(e => {
      console.log('Une erreur est survenue');
    }); 
  } 


}
