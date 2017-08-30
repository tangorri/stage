import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { NavParams } from 'ionic-angular';
import { ModalController, AlertController } from 'ionic-angular';

import firebase from 'firebase';
import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

// Pages
import { AccueilPage } from '../accueil/accueil';

//Modèles
import { Marchandise } from '../../modeles/marchandise.modele';
import { Client } from '../../modeles/client.modele';
import { ClientSearchComponent } from "../../components/client-search/client-search";
import { ChauffeursComponent } from "../../components/chauffeurs/chauffeurs";


@Component({
  selector: 'page-ramassage',
  templateUrl: 'ramassage.html',
  providers: [UtilisateurProvider],
  entryComponents: [ClientSearchComponent, ChauffeursComponent]
})

export class RamassagePage {
  u: any;
  prefixeUser: any;
  utilisateur: any;
  chauffeurName: any;
  chauffeur2: any;
  
  user:any;
  marchandise: any;
  marchandiseBinding : any;
  client: any;
  dernierBL: number;
  
  clientId:string ='';
  clientObject: any;
  clientVille:string ='';
  clientName:string ='';
  clientAdresse:string ='';
  clientCP:string ='';
  clientType:any;
  
  expediteur:any;
  expName: string ='';
  expAdresse: string ='';
  expCP: string ='';
  expVille: string ='';
  expTel:  string ='';
  
  destinataire:any;
  destName: string ='';
  destAdresse: string ='';
  destCP: string ='';
  destVille: string ='';
  destTel: string ='';
  destLng: any;
  destLat: any; 

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private afAuth: AngularFireAuth, private dbAf: AngularFireOfflineDatabase, private utilisateurProvider: UtilisateurProvider, public modalCtrl: ModalController, public navParams: NavParams, public http: Http) {
    // connexion database
    this.user = firebase.auth().currentUser.uid;
    this.marchandise = dbAf.list('/users/' + this.user + '/cargaison/');
    this.utilisateur = this.dbAf.list('/users/' + this.user);
    this.u = this.dbAf.list('/users/');

    // On récupère le type de client 
    this.clientType = navParams.get("clientType");
    
  }

   saveBL(bl) {
    // on récupère le dernier numéro pour incrémenter les suivants
    this.utilisateur.subscribe(res => {
      if(res.length === 4) {
        this.dernierBL = res[0].$value;
        this.prefixeUser = res[2].$value;
      };
      if(res.length === 5) {
        this.dernierBL = res[1].$value;
        this.prefixeUser = res[3].$value;
      };
    });
    console.log("dernierBL : ",this.dernierBL);
    this.marchandiseBinding = bl.value as Marchandise;
    this.marchandiseBinding.dateRamassage = Date.now();
    this.marchandiseBinding.chauffeurRamassage = this.user;
    this.marchandiseBinding.delivered = false;
    this.marchandiseBinding.expediteur = {
      name: this.expName,
      adresse: this.expAdresse,
      codePostal: this.expCP,
      ville: this.expVille,
      tel: this.expTel
    }; 
    this.marchandiseBinding.destinataire = {
      name: this.destName,
      adresse: this.destAdresse,
      codePostal: this.destCP,
      ville: this.destVille,
      tel: this.destTel,
      lat: this.destLat,
      lng: this.destLng
    };
    this.marchandiseBinding.echange = this.chauffeur2;
    this.dernierBL++;
    this.marchandiseBinding.numéroBL = this.prefixeUser + '-' + this.dernierBL;
    console.log("numéroBL : ",this.marchandiseBinding.numéroBL);

    console.log(this.marchandiseBinding);
    for(let cle in this.marchandiseBinding) {
      if (this.marchandiseBinding[cle] === undefined) {
        delete this.marchandiseBinding[cle];
      }
    }

    let confirm = this.alertCtrl.create({
      title: 'Ajouter Bon de Livraison',
      message: 'Etes vous sûr de vouloir ajouter ce bon de livraison ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ajouter',
          handler: () => {
            this.marchandise.push(this.marchandiseBinding).offline.then( res => {
              this.u.update(this.user,{dernierBL: (this.dernierBL + 1)})
              alert('Bon de livraison ajouté avec succés');
              this.navCtrl.setRoot(AccueilPage);
            }).catch(e => {
              console.log('Une erreur est survenue');
            });  
          }
        }
      ]
    });
    confirm.present();
  } 

  searchExp() {
    let myModal = this.modalCtrl.create(ClientSearchComponent,{clientType: "expediteur"});
    myModal.onDidDismiss(exp => {
      if(exp) {
        this.getExp(exp);
        console.log("exp:",exp);
      }
    })
    myModal.present();
  };
  
  searchDest() {
    let myModal = this.modalCtrl.create(ClientSearchComponent,{clientType: "destinataire"});
    myModal.onDidDismiss(dest => {
      if(dest) {
        this.getDest(dest);
        console.log("dest:",dest);
      }
    })
    myModal.present();
  };

  getExp(client) {

      this.expName = client.name;
      this.expAdresse = client.adresse;
      this.expCP = client.codePostal;
      this.expVille = client.ville;
      this.expTel = client.tel;

      this.expediteur = client.name.toLowerCase() + ',  ' + client.ville.toLowerCase();
      console.log("expediteur: ", this.expediteur);
  }

  getDest(client) {
    if(client.clientType == "destinataire") {
      this.destName = client.name;
      this.destAdresse = client.adresse;
      this.destCP = client.codePostal;
      this.destVille = client.ville;
      this.destTel = client.tel;

      // obtenir les coordonées pour géoloc
      let destAdresseSearch = this.destAdresse+'+'+this.destCP+'+'+this.destVille;
      let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+destAdresseSearch+'&sensor=true&region=FR';
      console.log('url : ', url);
      this.http.get(url).map(res => res.json())
        .subscribe(
          data => {
            if (data.result) {
              this.destLat = data.results[0].geometry.location.lat;
              this.destLng = data.results[0].geometry.location.lng;
            } else {
                console.log("L'adresse complète n'est pas valide.");
                let destAdresseSearch = this.destCP+'+'+this.destVille;
                let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+destAdresseSearch+'&sensor=true&region=FR';
                this.http.get(url).map(res => res.json())
                .subscribe(
                  data => {
                    this.destLat = data.results[0].geometry.location.lat;
                    this.destLng = data.results[0].geometry.location.lng;
                });
            }
            console.log("lat, lng : ",this.destLat, " , ",this.destLng);
          }
        );
                        
      
      this.destinataire =  client.name.toLowerCase() + ',  ' +  client.ville.toLowerCase();
      console.log("destinataire: ", this.destinataire);
    };
  }

  echanger() {
    let myModal = this.modalCtrl.create(ChauffeursComponent);
    myModal.onDidDismiss(res => {
      if(res) {
        this.chauffeur2 = {
          name:res.username,
          id:res.$key
        };
        this.chauffeurName = this.chauffeur2.name;
        console.log("Nom du 2eme chauffeur: ",this.chauffeur2.name);
      }
    })
    myModal.present();
  };
}