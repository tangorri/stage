import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform} from 'ionic-angular';

// GoogleMap components
import {} from '@types/googlemaps';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, GoogleMapsAnimation, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';

import { InventairePage } from '../../pages/inventaire/inventaire';

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {
  adress: string;
  marker: any;
  map: GoogleMap;

  constructor(public navCtrl: NavController ,public modalCtrl: ModalController, public navParams: NavParams, private geoLocation: Geolocation, public platform: Platform, private googleMaps: GoogleMaps) {

    this.adress = navParams.get('adress');
    console.log(this.adress);

  }

// Load map only after view is initialized
  ngAfterViewInit() {
    this.loadMap();
  }
 
  loadMap() {
    
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    
    this.map = this.googleMaps.create(element);
    console.log('map is loading...');
    console.log('map : ', this.map);
  
    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );
  
    // create CameraPosition
    let position: CameraPosition = {
      target: {
        lat: 43.3576191,
        lng: -1.2144617
      },
      zoom: 18,
      tilt: 30
    };
  
    // move the map's camera to position
    this.map.moveCamera(position);
  
    /* // create new marker
    let markerOptions: MarkerOptions = {
      position: ionic,
      title: 'Ionic'
    };
  
    const marker: Marker = map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      }); */
  }

}
