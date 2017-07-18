import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-ramassage',
  templateUrl: 'ramassage.html'
})
export class RamassagePage {

  reference: number;
  designation: string;
  quantite: number;
  poids: number;
  prix: number;
  expediteur: string; 
  destinataire: string;

  constructor(public navCtrl: NavController) {

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
