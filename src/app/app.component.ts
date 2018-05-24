import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SincronizarPage } from '../pages/sincronizar/sincronizar';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage: any = HomePage;
  //rootPage: any = LoginPage;
  //rootPage: any = SincronizarPage;

  connected: Subscription;
  disconnected: Subscription;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public network: Network, public toast: ToastController) {

    //ao iniciar
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault(); default, with problem
      statusBar.styleLightContent(); //alterado
      splashScreen.hide();

      // watch network for a connection
      this.connected = this.network.onConnect().subscribe(data => {
        console.log('network connected!');
        console.log(data);
        this, this.displayNetworkUpdate(data.type);
      }, error => console.error(error));

      // watch network for a disconnect
      this.connected = this.network.onDisconnect().subscribe(data => {
        console.log('network was disconnected :-(');
        console.log(data);
        this, this.displayNetworkUpdate(data.type);
      }, error => console.error(error));

    });

    //ao colocar em segundo plano
    platform.pause.subscribe(e => {
      this.stopWatchNetwork();
    });

  }

  stopWatchNetwork() {
    console.log('unsubscribe...');
    if (this.connected) this.connected.unsubscribe();
    if (this.disconnected) this.disconnected.unsubscribe();
  }

  displayNetworkUpdate(connectionState: string) {
    let networkType = this.network.type;
    let message;
    if (connectionState === 'offline') {
      message = 'Você está ' + connectionState + '.';
    }
    else {
      message = 'Você está ' + connectionState + ' via ' + networkType + '.';
    }
    console.log(networkType);
    this.toast.create({
      message: message,
      duration: 3000,
      position: 'top'
    }).present();
  }

}

