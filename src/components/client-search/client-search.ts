import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  items: any;
  clientId:string;
  clientName:any;
  clientVille:string;

  constructor( public navCtrl: NavController, private dbAf: AngularFireDatabase) {
    console.log("coucou recherche un client...");

    this.initializeItems();

    this.client = dbAf.list('/clients/');
    
    this.client.subscribe(snap => {
      for(var i:number = 0; i < snap.length; i++) {
        this.clientName = snap[i].$key;
        this.clientVille = snap[i].ville;
        this.clientId = snap[i].$key + ',   ' + snap[i].ville; 
        this.items.push([this.clientName, this.clientVille]);
      };
    });

  }

  initializeItems() {
    this.items = [
      this.clientName,
      this.clientVille
    ];
    console.log('Clients:', this.items);     
  }

  getItems(ev: any) {
    // reset items back to all of the items
     this.initializeItems(); 

    // set val to the value of the searchbar
    let val = ev.target.value;

    if (val && val.trim() != ' ') {
      this.items = this.items.filter((clientName, clientVille) => {
        return (clientName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  saveClient(searchQuery) {
    console.log(searchQuery);
    this.navCtrl.setRoot(RamassagePage, {searchQuery});
  }

}
