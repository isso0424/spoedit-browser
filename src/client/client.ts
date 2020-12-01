import { Playlist } from "../domain/playlist";
import { Track } from "../domain/track";
import { IPlaylistCreator } from "../usecase/creator";
import { IPlaylistDeleter } from "../usecase/deleter";
import { IPlaylistEditor } from "../usecase/editor";
import { ISearcher } from "../usecase/searcher";
import { IVerifier } from "../usecase/verifier";
import { Album } from "../domain/album";

export interface IAPIClient {
  createPlaylist(name: string): Promise<Playlist>;

  fetchPlaylist(): Promise<Array<Playlist>>;

  deletePlaylist(playlist: Playlist): Promise<Playlist>;

  addTrack(playlist: Playlist, track: Track): Promise<Playlist>;

  deleteTrack(playlist: Playlist, track: Track): Promise<Playlist>;

  renamePlaylist(playlist: Playlist, name: string): Promise<Playlist>;

  searchTrack(keyword: string): Promise<Array<Track>>;

  searchAlbum(keyword: string): Promise<Array<Album>>;
}

export class APIClient implements IAPIClient {
  constructor(
    verifier: IVerifier,
    creator: IPlaylistCreator,
    editor: IPlaylistEditor,
    deleter: IPlaylistDeleter,
    searcher: ISearcher
  ) {
    this.verifier = verifier;
    this.creator = creator;
    this.editor = editor;
    this.deleter = deleter;
    this.searcher = searcher;
  }

  verifier: IVerifier;

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

  async addTrack(playlist: Playlist, track: Track): Promise<Playlist> {
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

  async searchAlbum(keyword: string): Promise<Array<Album>> {
    return this.searcher.searchAlbum(keyword);
  }
}
