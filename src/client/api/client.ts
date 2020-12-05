import {Playlist} from "../../domain/playlist";
import {Track} from "../../domain/track";
import {IPlaylistCreator} from "../../usecase/creator";
import {IPlaylistDeleter} from "../../usecase/deleter";
import {IPlaylistEditor} from "../../usecase/editor";
import {ISearcher} from "../../usecase/searcher";
import {IAPIClient} from "../../usecase/client";

export class APIClient implements IAPIClient {
  constructor(
    creator: IPlaylistCreator,
    editor: IPlaylistEditor,
    deleter: IPlaylistDeleter,
    searcher: ISearcher
  ) {
    this.creator = creator;
    this.editor = editor;
    this.deleter = deleter;
    this.searcher = searcher;
  }

  creator: IPlaylistCreator;

  editor: IPlaylistEditor;

  deleter: IPlaylistDeleter;

  searcher: ISearcher;

  async fetchPlaylist(): Promise<Array<Playlist>> {
    return this.creator.fetch();
  }

  async createPlaylist(name: string): Promise<Playlist> {
    return this.creator.create(name);
  }

  async deletePlaylist(playlist: Playlist): Promise<Playlist> {
    return this.deleter.deletePlaylist(playlist);
  }

  async addTrack(playlist: Playlist, track: Array<Track>): Promise<Playlist> {
    return this.editor.addTrack(playlist, track);
  }

  async deleteTrack(playlist: Playlist, track: Track): Promise<Playlist> {
    return this.editor.deleteTrack(playlist, track);
  }

  async renamePlaylist(playlist: Playlist, name: string): Promise<Playlist> {
    return this.editor.renamePlaylist(playlist, name);
  }

  async searchTrack(keyword: string): Promise<Array<Track>> {
    return this.searcher.searchTrack(keyword);
  }
}
