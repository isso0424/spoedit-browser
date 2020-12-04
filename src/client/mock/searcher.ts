import {ISearcher} from "../../usecase/searcher";
import {Track} from "../../domain/track";

export class MockSearcher implements ISearcher {
  async searchTrack(keyword: string): Promise<Array<Track>> {
    return [
      {
        id: keyword,
        name: keyword,
        durationMs: 20,
        artistName: keyword.repeat(2),
        imageURL: "https://lohas.nicoseiga.jp/thumb/4531914i?",
        uri: "this is uri",
      }
    ];
  }
}