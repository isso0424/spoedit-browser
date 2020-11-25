import { Playlist } from "../domain/playlist";
import { Track } from "../domain//track";

export interface IPlaylistEditor {
  addTrack(track: Track): Playlist;

  deleteTrack(track: Track): Playlist;

  renamePlaylist(name: string): Playlist;
}
