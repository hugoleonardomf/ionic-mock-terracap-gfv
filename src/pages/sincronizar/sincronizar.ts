import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DenunciasPage } from '../denuncias/denuncias';
import { VistoriasPage } from '../vistorias/vistorias';
import { ChecklistPage } from '../checklist/checklist';

@IonicPage()
@Component({
  selector: 'page-sincronizar',
  templateUrl: 'sincronizar.html',
})

export class SincronizarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    //
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SincronizarPage');
  }

  opcoesActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Hugo Leonardo M. Ferreira',
      buttons: [
        {
          text: 'Desconectar',
          handler: () => {
            console.log('Desconectar clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  itemSelectedDenuncia() {
    this.navCtrl.push(DenunciasPage);
  }

  itemSelectedExistente() {
    this.navCtrl.push(VistoriasPage);
  }

  itemSelectedNova() {
    this.navCtrl.push(ChecklistPage, {
      syncStatusParam: true
    });
  }

}
