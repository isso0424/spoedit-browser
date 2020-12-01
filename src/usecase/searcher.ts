import { Track } from "../domain/track";
import { Album } from "../domain/album";

export interface ISearcher {
  searchTrack(keyword: string): Promise<Array<Track>>;

  searchAlbum(keyword: string): Promise<Array<Album>>;
}
