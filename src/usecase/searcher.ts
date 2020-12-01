import { Track } from "../domain/track";

export interface ISearcher {
  searchTrack(keyword: string): Promise<Array<Track>>;
}
