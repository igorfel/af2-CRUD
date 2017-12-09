import { MessageBus } from './../../util/messageBus';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the SongsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SongsProvider {

  songsList: AngularFireList<any>;
  songs: Observable<any[]>

  constructor(public afDatabase: AngularFireDatabase, public msgBus: MessageBus) {
    this.songsList = afDatabase.list('/songs');
    this.songs = this.songsList.valueChanges();
  }

  /**
   * Tries to Create a new song in the database.
   * @param songData The new song to Create
   */
  public async add(songData){
    try {
      const newSongRef = this.songsList.push({})
      
      const result = await newSongRef.set({
        id: newSongRef.key,
        title: songData.title
      });

      if(result) {
        this.msgBus.showAlert("Sucess", "A new music was added");
      }
    } catch(e) {
      this.msgBus.showAlertError(e);
    }
  }

  /**
   * Tries to Delete a song from the database.
   * @param songId The song to delete
   */
  public async remove(songId) {
    try {
      const result = await this.songsList.remove(songId);
      
      if(result){
        this.msgBus.showAlert("Sucess", "Song removed");
      }
    } catch(e) {
      this.msgBus.showAlertError(e);
    }
  }

  /**
   * Tries to Update the song data.
   * @param songId The desired song to Update
   * @param songData The new value for the song
   */
  public async update(songId, songData){
    try{
      const result = await this.songsList.update(songId, {
        title: songData.title
      })

      if(result){
        this.msgBus.showAlert("Success", "Song updated");
      }
    } catch (e) {
      this.msgBus.showAlertError(e);
    }
    
  }
}
