import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class UtilisateurProvider {

  private data: any;
  private afAuth: any;
  private userProfile: any;


  constructor(public http: Http ) {
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