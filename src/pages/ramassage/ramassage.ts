import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import firebase from 'firebase';
import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Pages
import { AccueilPage } from '../accueil/accueil';

//Modèles
import { Marchandise } from '../../modeles/marchandise.modele';
import { Client } from '../../modeles/client.modele';
import { ClientSearchComponent } from "../../components/client-search/client-search";


@Component({
  selector: 'page-ramassage',
  templateUrl: 'ramassage.html',
  providers: [UtilisateurProvider],
  entryComponents: [ClientSearchComponent]
})

export class RamassagePage {

  marchandise: FirebaseListObservable<any>;
  client: FirebaseListObservable<any>;
  marchandiseBinding : any;
  user:any;
  clientId:string ='';
  clientObject: any;
  clientVille: any;
  clientName: any;
  expediteur:any;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, private utilisateurProvider: UtilisateurProvider, public modalCtrl: ModalController, public navParams: NavParams) {
    this.user = firebase.auth().currentUser.uid;
    this.marchandise = dbAf.list('/users/' + this.user + '/cargaison/');

    // On récupère le client
    /* this.clientObject= navParams.get("itemClicked");
    console.log(navParams.get("name")); */ 


    if(this.clientId) {
      this.expediteur = navParams.get("searchQuery");
      console.log("new client: " + this.clientId);
    } else {
      this.expediteur = navParams.get("name");
      console.log("client: ", this.expediteur);
    }
    
  }

   saveBL(bl) {
    this.marchandiseBinding = bl.value as Marchandise;
    this.marchandiseBinding.dateRamassage = Date.now();
    console.log(this.marchandiseBinding);
    for(let cle in this.marchandiseBinding) {
      if (this.marchandiseBinding[cle] === undefined) {
        delete this.marchandiseBinding[cle];
        /* console.log("coucou"+cle); */
      }
    }

    this.marchandise.push(this.marchandiseBinding).then( res => {
      alert('Bon de livraison ajouté avec succés');
      this.navCtrl.setRoot(AccueilPage)
    }).catch(e => {
      console.log('Une erreur est survenue');
    }); 
  } 

  searchClient() {
    let myModal = this.modalCtrl.create(ClientSearchComponent);
    myModal.present();
  };

  

}
