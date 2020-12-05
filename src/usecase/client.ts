import {Playlist} from "../domain/playlist";
import {Track} from "../domain/track";

export interface IAPIClient {
  createPlaylist(name: string): Promise<Playlist>;

  fetchPlaylist(): Promise<Array<Playlist>>;

  deletePlaylist(playlist: Playlist): Promise<Playlist>;

  addTrack(playlist: Playlist, track: Array<Track>): Promise<Playlist>;

  deleteTrack(playlist: Playlist, track: Track): Promise<Playlist>;

  renamePlaylist(playlist: Playlist, name: string): Promise<Playlist>;

  searchTrack(keyword: string): Promise<Array<Track>>;
}