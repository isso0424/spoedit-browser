import { Playlist } from "../domain/playlist";
import { Track } from "../domain/track";

export interface IAPIClient {
  createPlaylist(name: string): Playlist;

  fetchPlaylist(): Array<Playlist>;

  deletePlaylist(playlist: Playlist): Playlist;

  addTrack(track: Track): Playlist;

  deleteTrack(track: Track): Playlist;

  renamePlaylist(track: Track): Playlist;

  searchTrack(keyword: string): Array<Track>;

  searchAlbum(keyword: string): Array<Array<Track>>;
}
