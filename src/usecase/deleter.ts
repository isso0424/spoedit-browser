import { Playlist } from "../domain/playlist";

export interface IPlaylistDeleter {
  deletePlaylist(playlist: Playlist): Promise<Playlist>;
}
