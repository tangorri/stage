import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/* import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database'; */

import firebase from 'firebase';

/*
  Generated class for the UtilisateurProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UtilisateurProvider {

  private data: any;
  private afAuth: any;
  private userProfile: any;


  constructor(public http: Http ) {
    /* console.log('Hello UtilisateurProvider Provider'); */
    this.afAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
    

  }

  connexion(email:string, password:string) : any {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  deconnexion() {
    return this.afAuth.signOut();
  }

  getUser(userId: any) {
    var userRef= this.userProfile.child(userId);
    console.log('userId : ' + userId);
    return userRef.once('value');
  }
  

}
