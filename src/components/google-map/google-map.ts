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

  constructor(public navCtrl: NavController ,public modalCtrl: ModalController, public navParams: NavParams, private geoLocation: Geolocation, public platform: Platform, private googleMaps: GoogleMaps) {

    this.destAdress = this.navParams.get('adress');
    this.destLatLng = this.navParams.get('latLng');
    console.log(this.destAdress);
    console.log(this.destLatLng);

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




 /*  
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
  
    // create new marker
    let markerOptions: MarkerOptions = {
      position: this.latLng,
      title: 'Ionic'
    };
  
    const marker: Marker = map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });
  } */

}
