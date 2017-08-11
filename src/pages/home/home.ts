import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UtilisateurProvider]
})
export class HomePage {

  email: string;


  constructor(public navCtrl: NavController, private utilisateurProvider: UtilisateurProvider) {
    console.log('se connecter avec: admin@admin.fr   mdp: admin1');
    console.log('ou avec: livreur@livreur.fr   mdp: livreur');
  }

  login() {
    this.utilisateurProvider.connexion(this.email).then(authData => {
      console.log('login !');
      this.navCtrl.setRoot(TabsPage)
    }, error => {
      console.log('erreur de connexion');
    }
    );
  }


}
