import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Loader } from '../../services/loader/loader';

@Component({
  selector: 'page-echange',
  templateUrl: 'echange.html'
})
export class EchangePage {

  constructor(public navCtrl: NavController, public loader: Loader) {

  }

}
