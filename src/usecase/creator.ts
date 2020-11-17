import { Playlist } from "../domain/playlist";

export interface IPlaylistCreator {
  fetch(): Array<Playlist>

  create(name: string): Playlist
}
