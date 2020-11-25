import { Playlist } from "../domain/playlist";

export interface IPlaylistCreator {
  fetch(): Promise<Array<Playlist>>;

  create(name: string): Promise<Playlist>;
}
