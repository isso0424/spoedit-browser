import { Playlist } from "../domain/playlist";
import { Track } from "../domain/track";
import { IPlaylistCreator } from "../usecase/creator";
import { IPlaylistDeleter } from "../usecase/deleter";
import { IPlaylistEditor } from "../usecase/editor";
import { Searcher } from "../usecase/searcher";
import { Verifier } from "../usecase/verifier";

export interface IAPIClient {
  createPlaylist(name: string): Playlist;

  fetchPlaylist(): Array<Playlist>;

  deletePlaylist(playlist: Playlist): Playlist;

  addTrack(track: Track): Playlist;

  deleteTrack(track: Track): Playlist;

  renamePlaylist(name: string): Playlist;

  searchTrack(keyword: string): Array<Track>;

  searchAlbum(keyword: string): Array<Array<Track>>;
}

export class APIClient implements IAPIClient {
  constructor(
    verifier: Verifier,
    creator: IPlaylistCreator,
    editor: IPlaylistEditor,
    deleter: IPlaylistDeleter,
    searcher: Searcher
  ) {
    this.verifier = verifier;
    this.creator = creator;
    this.editor = editor;
    this.deleter = deleter;
    this.searcher = searcher;
  }

  verifier: Verifier;

  creator: IPlaylistCreator;

  editor: IPlaylistEditor;

  deleter: IPlaylistDeleter;

  searcher: Searcher;

  fetchPlaylist(): Array<Playlist> {
    return this.creator.fetch();
  }

  createPlaylist(name: string): Playlist {
    return this.creator.create(name);
  }

  deletePlaylist(playlist: Playlist): Playlist {
    return this.deleter.deletePlaylist(playlist);
  }

  addTrack(track: Track): Playlist {
    return this.editor.addTrack(track);
  }

  deleteTrack(track: Track): Playlist {
    return this.editor.deleteTrack(track);
  }

  renamePlaylist(name: string): Playlist {
    return this.editor.renamePlaylist(name);
  }

  searchTrack(keyword: string): Array<Track> {
    return this.searcher.searchTrack(keyword);
  }

  searchAlbum(keyword: string): Array<Array<Track>> {
    return this.searcher.searchAlbum(keyword);
  }
}
