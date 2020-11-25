import { Playlist } from "../domain/playlist";
import { Track } from "../domain//track";

export interface IPlaylistEditor {
  addTrack(track: Track): Promise<Playlist>;

  deleteTrack(track: Track): Promise<Playlist>;

  renamePlaylist(name: string): Promise<Playlist>;
}
