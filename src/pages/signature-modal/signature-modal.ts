import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { InventairePage } from "../inventaire/inventaire";



@Component({
  selector: 'page-signature-modal',
  templateUrl: 'signature-modal.html',
})
export class SignatureModalPage {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    
  }

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  public signatureImage : string;

  
  drawCancel() {
    this.navCtrl.setRoot(InventairePage);
  }

   drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.navCtrl.setRoot(InventairePage, {signatureImage: this.signatureImage});
  }

  drawClear() {
    this.signaturePad.clear();
  }


}
