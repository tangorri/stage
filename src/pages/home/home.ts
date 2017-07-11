import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { Firebase } from '@ionic-native/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: string;
  password: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private firebase: Firebase) {

  }

    // Affichage de l' Alert Login
    alertLogin(): void {
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

  private firebaseConnect():void {
    this.firebase.getToken()
    .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
    .catch(error => console.error('Error getting token', error));

    this.firebase.onTokenRefresh()
    .subscribe((token: string) => console.log(`Got a new token ${token}`));
  }


}
