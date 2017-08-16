import { Component } from '@angular/core';
import { NavParams, ModalController, ViewController } from "ionic-angular";
import { NgForm } from '@angular/forms';

import { ClientSearchComponent } from '../client-search/client-search';


@Component({
  selector: 'new-client',
  templateUrl: 'new-client.html'
})
export class NewClientComponent {

  client: any;
  newClientName: string = '';
  newClientAdress: string = '';
  newClientCP: string = '';
  newClientVille: string = '';
  newClientTel: string = '';

  constructor(public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.newClientName = navParams.get("searchQuery");

  }

  saveNewClient(newClient) {
    this.client = {
      name: this.newClientName,
      adresse: this.newClientAdress,
      codePostal: this.newClientCP,
      ville: this.newClientVille,
      tel: this.newClientTel
    }
    console.log(this.client);
    this.viewCtrl.dismiss({       
      name: this.newClientName,
      adresse: this.newClientAdress,
      codePostal: this.newClientCP,
      ville: this.newClientVille,
      tel: this.newClientTel
    });

  }
}
