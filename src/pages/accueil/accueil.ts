import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Firebase } from '@ionic-native/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'; 


@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {

/*   email: string;
  password: string; */

  constructor(public navCtrl: NavController , private firebase: Firebase, private afAuth: AngularFireAuth ) {

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = snapshot.val().username;
      console.log(username);
    }); 

  }
    


}