import {Track} from "../../domain/track";
import {IRequester} from "../../usecase/requester";
import {ISearcher} from "../../usecase/searcher";
import {IVerifier} from "../../usecase/verifier";
import {Album} from "../../domain/album";

const endpoint = "/search";

const trackKey = "";
const albumKey = "";

export class Searcher implements ISearcher {
  constructor(requester: IRequester, verifier: IVerifier) {
    this.verifier = verifier;
    this.requester = requester;
  }

  private requester: IRequester;

  private verifier: IVerifier;

  async searchTrack(keyword: string): Promise<Array<Track>> {
    const accessToken = await this.verifier.getAccessToken();
    const searchQuery = encodeURI(keyword);

    const response = await this.requester.getData(
      endpoint,
      {
        q: searchQuery,
        type: trackKey,
      },
      {
        Authorization: "Bearer " + accessToken.token,
      }
    );

    const rawTracks = (response["tracks"] as Record<string, unknown>)["items"] as Array<Record<string, unknown>>;
    const tracks: Array<Track> = [];
    rawTracks.forEach((rawTrack) => {
      tracks.push({
        id: rawTrack["id"] as string,
        name: rawTrack["track"] as string,
        uri: rawTrack["uri"] as string,
        durationMs: rawTrack["duration_ms"] as number,
        artistName: (rawTrack["artists"] as Record<string, unknown>)["name"] as string,
        imageURL: (
          (rawTrack["album"] as Record<string, unknown>)["images"] as Array<Record<string, unknown>>
        )[0]["url"] as string,
      });
    });

    return tracks;
  }

  async searchAlbum(keyword: string): Promise<Array<Album>> {
    /* nothing */
  }
}
