import {IPlaylistEditor} from "../../usecase/editor";
import {Playlist} from "../../domain/playlist";
import {Track} from "../../domain/track";

export class MockPlaylistEditor implements IPlaylistEditor{
  async addTrack(playlist: Playlist, track: Track): Promise<Playlist> {
    playlist.tracks.push(track);

    return playlist;
  }


  async deleteTrack(playlist: Playlist, track: Track): Promise<Playlist> {
    playlist.tracks = playlist.tracks.filter(t => t.id != track.id);

    return playlist;
  }

  async renamePlaylist(playlist: Playlist, name: string): Promise<Playlist> {
    playlist.name = name;

    return playlist;
  }
}