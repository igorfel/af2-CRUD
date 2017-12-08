import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { SongsProvider } from '../../providers/songs/songs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public songsProvider : SongsProvider, public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {

  }

  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter the name of this new song",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log("Operation cancelled");
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.songsProvider.add(data);
          }
        }
      ]
    });

    prompt.present();
  }

  showOptions(songId, songTitle){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.songsProvider.remove(songId);
          }
        },{
          text: 'Update Title',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Operation cancelled');
          }
        }
      ]
    });

    actionSheet.present();
  }

  updateSong(songId: string, songTitle: string){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: 'Update the name of this song',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: songTitle
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Operation Cancelled');
          }
        },{
          text: 'Save',
          handler: data => {
            this.songsProvider.update(songId, data);
          }
        }
      ]
    });

    prompt.present();
  }
}
