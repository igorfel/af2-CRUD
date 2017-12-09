import { NavController } from 'ionic-angular';
import { MessageBus } from './../../util/messageBus';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/User';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  user = {} as User;

  public getUser(){
    return this.user;
  }

  public setUser(user: User) {
    this.user
  }

  public setUserEmail(email: string) {
    this.user.email = email;
  }

  public setUserPass(password: string) {
    this.user.password = password;
  }

  constructor(public afAuth: AngularFireAuth, public msgBus: MessageBus) {
    console.log('Hello AuthServiceProvider Provider');
  }

  /**
   * Request an login for a given user, and lazy loads the 'HomePage' or shows an Error alert.
   * @param user Self-descritive
   * @param navCtrl Injected responsibility for the sceneChange
   */
  public async loginByEmail(user: User, navCtrl: NavController) {
    try {
      this.user = user;
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
      if(result) {
        navCtrl.setRoot('HomePage');
      }
    } catch (e) {
      this.msgBus.showAlertError(e);
    }
  }

  /**
   * Logs out the current user and Lazy loads the 'LoginPage' or shows an Error alert.
   * @param navCtrl Injected responsibility for the sceneChange
   */
  public async logout(navCtrl: NavController) {
    try {
      const result = await this.afAuth.auth.signOut();
      
      navCtrl.setRoot('LoginPage');
    } catch(e) {
      this.msgBus.showAlertError(e);
    }
    
  }

  /**
   * Creates an user given an Email and a password and Lazy loads the 'HomePage' or shows an Error alert.
   * @param user Self-descritive
   * @param navCtrl Injected responsibility for the sceneChange
   */
  public async registerByEmail(user: User, navCtrl: NavController) {
    try {
      this.user = user;
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

      if(result) {
        navCtrl.setRoot('HomePage');
        let tempUsername = user.email.split("@")[0];
        this.msgBus.showAlert("Account Registered", "Welcome " + tempUsername + ", we're glad to see you here!");
      }
    } catch (e) {
      this.msgBus.showAlertError(e);
    }
  }
}
