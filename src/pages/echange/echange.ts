import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

//Pages
import { AccueilPage } from '../accueil/accueil';

//Modèles
import { Marchandise } from '../../modeles/marchandise.modele';
import { ChauffeursComponent } from "../../components/chauffeurs/chauffeurs";

@Component({
  selector: 'page-echange',
  templateUrl: 'echange.html'
})

export class EchangePage {
  chauffeurName: any;
  chauffeur2: { name: any; id: any; };

  // le modèle des marchandises
  marchandise: any;
  user:any;


  constructor(
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private afAuth: AngularFireAuth, private dbAf: AngularFireOfflineDatabase, public modalCtrl: ModalController) {
      // On récupère l'id de l'utilisateur en cours
      this.user = firebase.auth().currentUser.uid;
      // On se connecte à la base de donnée sur l'élément à modifier
      this.marchandise = dbAf.list('/users/' + this.user + '/cargaison/');
      this.marchandise.subscribe(res => {
        console.log("res: ",res);
      }); 

  }
  
  annuler(key) {
    let echangeRemove = this.dbAf.list('/users/' + this.user + '/cargaison/'+ key + '/echange/');
    echangeRemove.remove().offline.then(res => {
      console.log('echange supprimé');
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

  valider(marchandis) {
    let chauffeurId;

    let echangeOk =  this.dbAf.list('/users/' + marchandis.echange.id + '/cargaison/');
    delete marchandis.echange;
    echangeOk.update(marchandis.$key, marchandis).offline.then(res =>{
      this.marchandise.remove(marchandis.$key);
    });
  }

  validateAll(marchandise) {
    this.marchandise.offline.subscribe(res => {
      res.forEach(element => { 
        if(element.echange) {   
          this.valider(element);
        }
      });
    });
  }

}