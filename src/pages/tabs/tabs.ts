import { Component } from '@angular/core';

import { HomePage } from '../home/home';
/* import { AccueilPage } from '../accueil/accueil'; */
import { RamassagePage } from '../ramassage/ramassage';
import { LivraisonPage } from '../livraison/livraison';
import { EchangePage } from '../echange/echange';
import { ClientsPage } from '../clients/clients';
import { InventairePage } from '../inventaire/inventaire';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RamassagePage;
  tab3Root = LivraisonPage;
  tab4Root = EchangePage;
  tab5Root = ClientsPage;
  tab6Root = InventairePage;

  constructor() {

  }
}
