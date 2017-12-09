import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class MessageBus {

    constructor(public alertCtrl: AlertController) {

    }

    public showAlert(title: string, message: string){
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        })

        alert.present();
    }

    /**
     * Receives an error object, must contain code and message.
     *
     *   e {
     *       code: "title",
     *       message: "subtitle"
     *   }
     */
    public showAlertError(e){
        let alert = this.alertCtrl.create({
            title: e.code,
            subTitle: e.message,
            buttons: ['OK']
        })

        alert.present();
    }
}