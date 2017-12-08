import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { database } from 'firebase/app';

/*
  Generated class for the SongsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SongsProvider {

  songsList: AngularFireList<any>;
  songs: Observable<any[]>

  constructor(public afDatabase: AngularFireDatabase) {
    this.songsList = afDatabase.list('/songs');
    this.songs = this.songsList.valueChanges();
  }

  public add(songData){
    const newSongRef = this.songsList.push({})
    
    newSongRef.set({
      id: newSongRef.key,
      title: songData.title
    })
  }

  public remove(songId) {
    this.songsList.remove(songId);
  }

  public update(songId, songData){
    this.songsList.update(songId, {
      title: songData.title
    })
  }
}
