import { Component } from '@angular/core';

import { HomePage } from '../home/home';
 import { AccueilPage } from '../accueil/accueil'; 
import { RamassagePage } from '../ramassage/ramassage';

import { EchangePage } from '../echange/echange';

import { InventairePage } from '../inventaire/inventaire';
import { NavParams } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tabIndex: number = 0;

  tab1Root = AccueilPage;
  tab2Root = RamassagePage;
  tab3Root = EchangePage;
  tab4Root = InventairePage;

  constructor(navParams: NavParams) {

    let tabIndex = navParams.get("tabIndex");
    if(tabIndex) {
      console.log("tabIndex:",tabIndex)
      this.tabIndex = tabIndex;
    }

  }
}
