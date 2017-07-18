import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';



@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {


  constructor(public navCtrl: NavController , private afAuth: AngularFireAuth, private dbAf: AngularFireDatabase ) {

    var userId = afAuth.auth.currentUser.uid;
    console.log('userId: '+userId);

    dbAf.database.ref('/users/'+ userId).once('value').then(function(snapshot) {
      var username = snapshot.val().username;
      console.log('username: '+username);
    }); 

  }


}