import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform} from 'ionic-angular';
// Native components
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, GoogleMapsAnimation, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';

import { InventairePage } from '../../pages/inventaire/inventaire';

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {
  public map: GoogleMap;
  adress: string;

  constructor(public navCtrl: NavController ,public modalCtrl: ModalController, public navParams: NavParams, private geoLocation: Geolocation, public platform: Platform, private googleMaps: GoogleMaps) {

    this.adress = navParams.get('adress');
    console.log(this.adress);

    // ici, transformer l'adresse en latitude / longitude

    platform.ready().then(() => {
      this.loadMap();
    });
    
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // Geolocation
    this.geoLocation.getCurrentPosition().then((resp) => {

      let userPosition: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);

      let position: CameraPosition = {
        target: userPosition,
        zoom: 18,
        tilt: 30
      };

      this.map.moveCamera(position);

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
        this.addMarkerOnMap(this.adress.lat, this.adress.lng);
        
      }
    );
  }

  private addMarkerOnMap(this.adress.lat, this.adress.lng) {
    // create LatLng object
    let MarkerPosition: LatLng = new LatLng(adress.lat,adress.lng);

    let MarkerOptions: MarkerOptions = {
      position: MarkerPosition,
      title: 'adresse du destinataire',
      animation: GoogleMapsAnimation.DROP
    };

    this.map.addMarker(MarkerOptions)
    .then((marker: Marker) => {
      marker.showInfoWindow();
    });

  }

}
