import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class UtilisateurProvider {

  private data: any;
  private afAuth: any;
  private userProfile: any;
  public utilisateurs= {
    "bureau": {
      "mail": "bureau@64.fr",
      "username": "bureau"
    },
    "gaetan64": {
      "mail": "gaetan64@64.fr",
      "username": "gaetan64"
    },
    "mickael64": {
      "mail": "mickael64@64.fr",
      "username": "mickael64"
    },
    "michels64": {
      "mail": "michels64@64.fr",
      "username": "michels64"
    },
    "vincent40": {
      "mail": "vincent40@40.fr",
      "username": "vincent40"
    },
    "yannick40": {
      "mail": "yannick40@40.fr",
      "username": "yannick40"
    },
    "benoit40": {
      "mail": "benoit40@40.fr",
      "username": "benoit40"
    },
    "leon64": {
      "mail": "leon64@64.fr",
      "username": "leon64"
    },
    "loritz64": {
      "mail": "loritz64@64.fr",
      "username": "loritz64"
    },
    "jeanmichel64": {
      "mail": "jeanmichel64@64.fr",
      "username": "jeanmichel64"
    },
    "johann40": {
      "mail": "johann40@40.fr",
      "username": "johann40"
    },
    "olivier40": {
      "mail": "olivier40@40.fr",
      "username": "olivier40"
    },
    "nicolas40": {
      "mail": "nicolas40@40.fr",
      "username": "nicolas40"
    },
    "beatrice64": {
      "mail": "beatrice64@64.fr",
      "username": "beatrice64"
    },
    "frederic40": {
      "mail": "frederic40@40.fr",
      "username": "frederic40"
    },
    "stephanec40": {
      "mail": "stephanec40@40.fr",
      "username": "stephanec40"
    },
    "sebastien40": {
      "mail": "sebastien40@40.fr",
      "username": "sebastien40"
    },
    "alex64": {
      "mail": "alex64@64.fr",
      "username": "alex64"
    },
    "georges40": {
      "mail": "georges40@40.fr",
      "username": "georges40"
    },
    "rachel40": {
      "mail": "rachel40@40.fr",
      "username": "rachel40"
    },
    "david64": {
      "mail": "david64@64.fr",
      "username": "david64"
    },
    "sebastien64": {
      "mail": "sebastien64@64.fr",
      "username": "sebastien64"
    },
    "michel64": {
      "mail": "michel64@64.fr",
      "username": "michel64"
    },
    "iker64": {
      "mail": "iker64@64.fr",
      "username": "iker64"
    },
    "stephane40": {
      "mail": "stephane40@40.fr",
      "username": "stephane40"
    }
  }


  constructor(public http: Http) {
    this.afAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
  }

  connexion(identifiant:string) : any {
    /* console.log(identifiant); */
    return this.afAuth.signInWithEmailAndPassword(this.utilisateurs[identifiant].mail, identifiant);
  }
  
  deconnexion() {
    console.log("logout");
    return this.afAuth.signOut();
  }
  getUser(userId: any) {
    var userRef= this.userProfile.child(userId);
    /* console.log('userId : ' + userId); */
    return userRef.once('value');
  }
  
}