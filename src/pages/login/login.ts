import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { MessageBus } from './../../util/messageBus';
import { User } from './../../models/User';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private user = {} as User;

  constructor(public authProvider: AuthServiceProvider, public afAuth: AngularFireAuth, public msgBus: MessageBus, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async requestLoginOf(user: User) {
    this.authProvider.loginByEmail(user, this.navCtrl);
  }

  requestNew(user: User){
    this.authProvider.registerByEmail(user, this.navCtrl);
  }

}
