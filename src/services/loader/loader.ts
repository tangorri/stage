import { Component } from '@angular/core';

@Component({
  selector: 'service-loader',
  templateUrl: 'loader.html'
})

export class Loader {
  // indiquer à la vue si les données sont chargée.
  itemsLoaded:boolean = false;

  constructor() {
    // on laisse 3sec de chargement
    setTimeout(() => { 
      this.itemsLoaded = true;
    }, 2500);
  }
}