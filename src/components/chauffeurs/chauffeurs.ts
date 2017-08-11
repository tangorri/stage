import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, ViewController, Searchbar } from 'ionic-angular';

// Database
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

// Pages
import { RamassagePage } from '../../pages/ramassage/ramassage';


@Component({
  selector: 'chauffeurs',
  templateUrl: 'chauffeurs.html'
})
export class ChauffeursComponent {

  @ViewChild('searchbar') searchbar: Searchbar;
  
  users: any;
  searchQuery: string = '';
  chauffeur: any;
  items: Array<any>;
  loadItems: Array<any>;

  constructor(public navCtrl: NavController, private dbAf: AngularFireOfflineDatabase,  public modalCtrl: ModalController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.users = this.dbAf.list('/users/');
    this.users.subscribe(snap => {
      let chauffeurs = [];
      snap.forEach(element => {
        /* console.log("element",element); */
        chauffeurs.push(element);
      });
      this.items = chauffeurs;
       console.log("this.items:",chauffeurs); 
      this.loadItems = chauffeurs;
    });
  }

  ionViewDidEnter() {
    setTimeout(res => {
      this.searchbar.setFocus();
    }, 100);
  }
  
  initializeItems() {
    this.items = this.loadItems;
  }

  getItems(ev: any) {
    this.initializeItems(); 
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  chooseChauffeur(itemClicked) {
    this.viewCtrl.dismiss(itemClicked);
    console.log(itemClicked);
    
  }

}
