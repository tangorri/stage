import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: string;
  password: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

    showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Entrez votre nom et votre mot de passe pour vous connecter.",
      inputs: [
        {
          name: 'user',
          placeholder: 'Chauffeur'
        },
        {
          name: 'password',
          placeholder: 'Mot de passe',
          type: 'password',
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Annuler');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            console.log('Valider');
          }
        }
      ]
    });
    prompt.present();
  }


}
