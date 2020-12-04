import {IPlaylistDeleter} from "../../usecase/deleter";
import {Playlist} from "../../domain/playlist";

export class MockPlaylistDeleter implements IPlaylistDeleter {
  async deletePlaylist(playlist: Playlist): Promise<Playlist> {
    return playlist;
  }
}