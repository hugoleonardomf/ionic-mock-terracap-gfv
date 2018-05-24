import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FiscalProvider, Pasta } from '../../providers/fiscal/fiscal';

@IonicPage()
@Component({
  selector: 'page-edit-pasta',
  templateUrl: 'edit-pasta.html',
})
export class EditPastaPage {

  today: number;
  model: Pasta;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fiscalProvider: FiscalProvider, private toast: ToastController, private alertCtrl: AlertController) {
    if (this.navParams.data.pasta && this.navParams.data.key) {
      this.model = this.navParams.data.pasta;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Pasta();
      this.model.criacao = new Date();
    }
  }

  save() {
    if (this.model.descricao == null || this.model.descricao == '') {
      this.showAlert('Aviso', 'É obrigatório informar uma descrição.');
      return;
    }
    this.savePasta()
      .then(() => {
        this.toast.create({ message: 'Item salvo com sucesso.', duration: 3000, position: 'bottom' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o item.', duration: 3000, position: 'bottom' }).present();
      });
  }

  private savePasta() {
    if (this.key) {
      return this.fiscalProvider.updatePasta(this.key, this.model);
    } else {
      return this.fiscalProvider.insertPasta(this.model);
    }
  }

  showAlert(titulo: string, texto: string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: texto,
      buttons: ['OK']
    });
    alert.present();
  }

}
