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
  items: string[];
  clientId:string;

  constructor( public navCtrl: NavController, private dbAf: AngularFireDatabase) {

    this.client = dbAf.list('/clients/');
    

    this.initializeItems();
   
    console.log("coucou recherche un client...");


    this.client.forEach(item => {
      for(var i:number = 0; i < item.length; i++) {
        this.clientId = item[i].$key + ',   ' + item[i].ville; 
        this.items.push(this.clientId);
      };
    });
  }

  initializeItems() {
    this.items = [
      this.clientId,
    ];
    console.log('Item:', this.items);     
  }

  getItems(ev: any) {
    // reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    if (val && val.trim() != ' ') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}
