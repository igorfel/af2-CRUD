import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { database } from 'firebase/app';
import { Title } from '@angular/platform-browser/src/browser/title';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  songsList: AngularFireList<any>;
  songs: Observable<any[]>

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public afDatabase: AngularFireDatabase) {
    this.songsList = afDatabase.list('/songs');
    this.songs = this.songsList.valueChanges();
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
            const newSongRef = this.songsList.push({})

            newSongRef.set({
              id: newSongRef.key,
              title: data.title
            })
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
            this.removeSong(songId);
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

  removeSong(songId: string){
    this.songsList.remove();
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
            this.songsList.update(songId, {
              title: data.title
            });
          }
        }
      ]
    });

    prompt.present();
  }
}
