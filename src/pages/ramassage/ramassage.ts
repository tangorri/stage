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
  clientVille:string ='';
  clientName:string ='';
  clientAdresse:string ='';
  clientCP:string ='';
  clientType:string ='';
  expediteur:any;
  destinataire:any;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, private utilisateurProvider: UtilisateurProvider, public modalCtrl: ModalController, public navParams: NavParams) {
    // connexion database
    this.user = firebase.auth().currentUser.uid;
    this.marchandise = dbAf.list('/users/' + this.user + '/cargaison/');

    // On récupère le client 
    this.clientType = navParams.get("clientType");
    this.clientName = navParams.get("name");
    this.clientVille = navParams.get("ville");
    this.clientAdresse = navParams.get("adresse");
    this.clientCP = navParams.get("codePostal");

    this.expediteur = this.getExp();
    this.destinataire = this.getDest();

/*     if(this.clientType == "expediteur") {
      if(this.clientName) {
        this.expediteur = this.clientName + ',  ' + this.clientAdresse +' ' +  this.clientCP +' ' +  this.clientVille;
        console.log("client: ", this.expediteur);
      }
      if(this.clientId) {
        this.expediteur = navParams.get("searchQuery");
        console.log("new client: " + this.clientId);
      }
      return this.expediteur;  
    };
    if(this.clientType == "destinataire") {
      if(this.clientName) {
        this.destinataire = this.clientName + ',  ' + this.clientAdresse +' ' +  this.clientCP +' ' +  this.clientVille;
        console.log("client: ", this.destinataire);
      }
      if(this.clientId) {
        this.destinataire = navParams.get("searchQuery");
        console.log("new client: " + this.clientId);
      }
      return this.destinataire; 
    }; */
    
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

  searchExp() {
    let myModal = this.modalCtrl.create(ClientSearchComponent,{clientType: "expediteur"});
    myModal.present();
  };
  
  searchDest() {
    let myModal = this.modalCtrl.create(ClientSearchComponent,{clientType: "destinataire"});
    myModal.present();
  };

  getExp() {
    if(this.clientType == "expediteur") {
      if(this.clientName) {
        this.expediteur = this.clientName + ',  ' + this.clientAdresse +' ' +  this.clientCP +' ' +  this.clientVille;
        console.log("expediteur: ", this.expediteur);
      }
      if(this.clientId) {
        this.expediteur = this.navParams.get("searchQuery");
        console.log("new expediteur: " + this.clientId);
      }
      return this.expediteur;  
    };
  }

  getDest() {
    if(this.clientType == "destinataire") {
      if(this.clientName) {
        this.destinataire = this.clientName + ',  ' + this.clientAdresse +' ' +  this.clientCP +' ' +  this.clientVille;
        console.log("destinataire: ", this.destinataire);
      }
      if(this.clientId) {
        this.destinataire = this.navParams.get("searchQuery");
        console.log("new destinataire: " + this.clientId);
      }
      return this.destinataire; 
    };
  }

  

}
