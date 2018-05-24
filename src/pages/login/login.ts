import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SincronizarPage } from '../sincronizar/sincronizar';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { matricula: string, password: string } = {
    matricula: '12345678',
    password: 'password'
  };

  constructor(public navCtrl: NavController) { }

  doLogin() {
    this.navCtrl.push(SincronizarPage);
  }
}
