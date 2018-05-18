import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private fiscalProvider: FiscalProvider, private toast: ToastController) {
    if (this.navParams.data.pasta && this.navParams.data.key) {
      this.model = this.navParams.data.pasta;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Pasta();
      this.model.criacao = new Date();
    }
  }

  save() {
    this.savePasta()
      .then(() => {
        this.toast.create({ message: 'Vistoria salva com sucesso.', duration: 3000, position: 'bottom' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar a vistoria.', duration: 3000, position: 'bottom' }).present();
      });
  }

  private savePasta() {
    if (this.key) {
      return this.fiscalProvider.updatePasta(this.key, this.model);
    } else {
      return this.fiscalProvider.insertPasta(this.model);
    }
  }

}
