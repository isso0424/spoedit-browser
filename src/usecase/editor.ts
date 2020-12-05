import {Playlist} from "../domain/playlist";
import {Track} from "../domain/track";

export interface IPlaylistEditor {
  addTrack(playlist: Playlist, track: Array<Track>): Promise<Playlist>;

  deleteTrack(playlist: Playlist, track: Track): Promise<Playlist>;

  renamePlaylist(playlist: Playlist, name: string): Promise<Playlist>;
}
