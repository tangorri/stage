import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

// Database
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// Pages
import { RamassagePage } from '../../pages/ramassage/ramassage';

//Modèles
import { Marchandise } from '../../modeles/marchandise.modele';
import { Client } from '../../modeles/client.modele';

@Component({
  selector: 'client-search',
  templateUrl: 'client-search.html'
})

export class ClientSearchComponent {

  client: any;
  searchQuery: string = '';
  items: Array<any>;
  loadItems: Array<any>;
  clientId:string;
  clientName:any;
  clientVille:string;

  constructor( public navCtrl: NavController, private dbAf: AngularFireDatabase,  public modalCtrl: ModalController) {
    console.log("coucou recherche un client...");

    /* this.initializeItems(); */

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

  initializeItems() {
      this.items = this.loadItems; 
    console.log('Clients:', this.items);     
  }

  getItems(ev: any) {
    this.initializeItems(); 
    // set val to the value of the searchbar
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log("item"+item);
        return (item.$key.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  saveClient(itemClicked) {
    console.log(itemClicked.ville);
    this.navCtrl.setRoot(RamassagePage, {ville:itemClicked.ville, name:itemClicked.$key});
  }
  nouveauClient(searchQuery) {
    console.log(searchQuery);
    this.navCtrl.setRoot(RamassagePage, {name:searchQuery});
  }

}
