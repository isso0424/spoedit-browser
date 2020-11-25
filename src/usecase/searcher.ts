import { Track } from "../domain/track";

export interface Searcher {
  searchTrack(keyword: string): Array<Track>;

  searchAlbum(keyword: string): Array<Array<Track>>;
}
