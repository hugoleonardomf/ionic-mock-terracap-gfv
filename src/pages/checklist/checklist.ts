import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html',
})

export class ChecklistPage {

  public syncStatus: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.syncStatus = this.navParams.get('syncStatusParam');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChecklistPage');
  }

  save() {
    this.navCtrl.pop();
  }

  sync() {
    this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Sincronizar',
      message: 'Confirma o envio das informações para o sistema GFV da Terracap.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: () => {
            console.log('Enviar clicked');
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }

}
