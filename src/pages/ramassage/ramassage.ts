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

  user:any;
  marchandise: FirebaseListObservable<any>;
  marchandiseBinding : any;
  client: FirebaseListObservable<any>;

  clientId:string ='';
  clientObject: any;
  clientVille:string ='';
  clientName:string ='';
  clientAdresse:string ='';
  clientCP:string ='';
  clientType:string ='';

  expediteur:any;
  expCP: string ='';
  expAdresse: string ='';
  expVille: string ='';
  expName: string ='';

  destinataire:any;
  destCP: string ='';
  destAdresse: string ='';
  destVille: string ='';
  destName: string ='';

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase, private utilisateurProvider: UtilisateurProvider, public modalCtrl: ModalController, public navParams: NavParams) {
    // connexion database
    this.user = firebase.auth().currentUser.uid;
    this.marchandise = dbAf.list('/users/' + this.user + '/cargaison/');

    // On récupère le type de client 
    this.clientType = navParams.get("clientType");

/*     this.expediteur = this.getExp();
    this.destinataire = this.getDest(); */
    
  }

   saveBL(bl) {
    this.marchandiseBinding = bl.value as Marchandise;
    this.marchandiseBinding.dateRamassage = Date.now();
    this.marchandiseBinding.chauffeurRamassage = this.user;
    this.marchandiseBinding.delivered = false;
    this.marchandiseBinding.expediteur = {
      name: this.expName,
      adresse: this.expAdresse,
      codePostal: this.expCP,
      ville: this.expVille
    }; 
    this.marchandiseBinding.destinataire = {
      name: this.destName,
      adresse: this.destAdresse,
      codePostal: this.destCP,
      ville: this.destVille
    };
    console.log(this.marchandiseBinding);
    for(let cle in this.marchandiseBinding) {
      if (this.marchandiseBinding[cle] === undefined) {
        delete this.marchandiseBinding[cle];
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
    myModal.onDidDismiss(exp => {
      this.getExp(exp);
      console.log("exp:",exp);
    })
    myModal.present();
  };
  
  searchDest() {
    let myModal = this.modalCtrl.create(ClientSearchComponent,{clientType: "destinataire"});
    myModal.onDidDismiss(dest => {
      this.getDest(dest);
      console.log("dest:",dest);
    })
    myModal.present();
  };

  getExp(client) {
    if(client.clientType == "expediteur") {
      this.expName = client.name;
      this.expVille = client.ville;
      this.expAdresse = client.adresse;
      this.expCP = client.codePostal;

      this.expediteur = client.name + ',  ' + client.adresse +' ' +  client.codePostal +' ' +  client.ville;
      console.log("expediteur: ", this.expediteur);

      return this.expediteur;
    };
  }

  getDest(client) {
    if(client.clientType == "destinataire") {
      this.destName = client.name;
      this.destVille = client.ville;
      this.destAdresse = client.adresse;
      this.destCP = client.codePostal;

      this.destinataire =  client.name + ',  ' + client.adresse +' ' +  client.codePostal +' ' +  client.ville;
      console.log("destinataire: ", this.destinataire);

      return this.destinataire;
    };
  }

}