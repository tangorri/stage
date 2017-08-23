import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, Platform} from 'ionic-angular';

// GoogleMap components
import {} from '@types/googlemaps';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, GoogleMapsAnimation, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';

import { InventairePage } from '../../pages/inventaire/inventaire';

declare var google;

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {
  @ViewChild('map') mapElement: ElementRef;
  destAdress: string;
  destLatLng: string;
  marker: any;
  map: any;
  url: string;

  constructor(public navCtrl: NavController ,public modalCtrl: ModalController, public navParams: NavParams, private geoLocation: Geolocation, public platform: Platform, private googleMaps: GoogleMaps) {

    this.destAdress = this.navParams.get('adress');
    this.destLatLng = this.navParams.get('latLng');
    console.log("lat, lng : ",this.destLatLng);
    /* this.url = "https://www.google.fr/maps/@"+this.destLatLng+",15z?hl=fr";
    console.log(this.url);
    this.map = document.getElementById("gmap");
    this.map.setAttribute('src', this.url); */
  }


  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    
    let latLng = new google.maps.LatLng(this.destLatLng);
    console.log("la carte est en cours de chargement");
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
 
  }


}
