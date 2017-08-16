import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController, Searchbar } from 'ionic-angular';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

// Database
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Pages
import { RamassagePage } from '../../pages/ramassage/ramassage';

//Modèles
import { Marchandise } from '../../modeles/marchandise.modele';
import { Client } from '../../modeles/client.modele';
import { NewClientComponent } from "../new-client/new-client";

@Component({
  selector: 'client-search',
  templateUrl: 'client-search.html',
  entryComponents: [NewClientComponent]
})


export class ClientSearchComponent {

  @ViewChild('searchbar') searchbar: Searchbar;

  client: any;
  searchQuery: string = '';
  items: Array<any>;
  loadItems: Array<any>;
  clientId:string;
  clientName:any;
  clientVille:string;
  clientType:any;

  constructor( public navCtrl: NavController, private dbAf: AngularFireOfflineDatabase,  public modalCtrl: ModalController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.clientType = navParams.get("clientType");
    this.client = this.dbAf.list('/clients/');
    
    this.client.subscribe(snap => {
      let clients = [];
      snap.forEach(element => {
        /* console.log("element",element); */
        clients.push(element);
      });
      this.items = clients;
      /* console.log("this.items:",clients); */
      this.loadItems = clients;
    });

  }

  ionViewDidEnter() {
    setTimeout(res => {
      this.searchbar.setFocus();
    }, 100);
  }

  initializeItems() {
    this.items = this.loadItems;     
  }

  getItems(ev: any) {
    this.initializeItems(); 
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  saveClient(itemClicked) {
    this.viewCtrl.dismiss({clientType: this.clientType, adresse: itemClicked.adresse, codePostal: itemClicked.codePostal, ville:itemClicked.ville, name:itemClicked.nom, tel:itemClicked.tel});
  }

  nouveauClient(searchQuery) {
    let myModal = this.modalCtrl.create(NewClientComponent, searchQuery);
    myModal.onDidDismiss(newClient => {       
      if(newClient) {
        this.viewCtrl.dismiss({clientType: this.clientType, adresse: newClient.adresse, codePostal: newClient.codePostal, ville:newClient.ville, name:newClient.name, tel:newClient.tel});
      }
    })
    myModal.present();
  }

}