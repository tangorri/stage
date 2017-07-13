import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';



@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

  reference: number;
  designation: string;
  quantite: number;
  poids: number;
  prix: number;
  expediteur: string; 
  destinataire: string; 

  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase ) {

    var userId = afAuth.auth.currentUser.uid;
    console.log('userId: '+userId);

    dbAf.database.ref('/objects/1/').once('value').then(function(snapshot) {
      var designation = snapshot.val().designation;
      console.log('designation: '+designation);
    }); 

  }
    
  public setObject(): void {
    console.log('reference : ' + this.reference);
    console.log('designation : ' + this.designation);
    console.log('quantite : ' + this.quantite);
    console.log('poids : ' + this.poids);
    console.log('prix : ' + this.prix);
    console.log('expediteur : ' + this.expediteur);
    console.log('destinataire : ' + this.destinataire);

    alert('La référence n° ' + this.reference + ' à bien été ajoutée !' +
          ' designation : ' + this.designation + 
          ' quantite : ' + this.quantite +
          ' poids : ' + this.poids + 
          ' prix : ' + this.prix +
          ' expediteur : ' + this.expediteur +
          ' destinataire : ' + this.destinataire);
  }


}