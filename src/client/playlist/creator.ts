import {Playlist} from "../../domain/playlist";
import {Track} from "../../domain/track";
import {IPlaylistCreator} from "../../usecase/creator";
import {Requester} from "../requester";
import {Verifier} from "../verifier";

const fetchPlaylistEndpoint = "/me/playlists";

export class PlaylistCreator implements IPlaylistCreator {
  private requester = new Requester();
  
  private verifier = new Verifier();

  async fetch(): Promise<Array<Playlist>> {
    const accessToken = await this.verifier.getAccessToken();
    const response = await this.requester.getData(
      fetchPlaylistEndpoint,
      { limit: "50" },
      { Authorization: "Bearer " + accessToken.token },
    );

    const items = response["items"] as Array<Record<string, unknown>>;
    const playlists: Array<Playlist> = [];
    for (const rawPlaylist of items) {
      const tracksURL = (rawPlaylist["tracks"] as Record<string, unknown>).href as string;
      const tracks = await this.fetchTracks(tracksURL);
      playlists.push({
        id: rawPlaylist["id"] as string,
        description: rawPlaylist["description"] as string,
        name: rawPlaylist["name"] as string,
        tracks,
      });
    }

    return playlists;
  }

  private async fetchTracks(url: string): Promise<Array<Track>> {
    const requestEndpoint = url.replace("https://api.spotify.com/v1", "");
    const accessToken = await this.verifier.getAccessToken();

    const response = await this.requester.getData(requestEndpoint, {}, {
      Authorization: "Bearer " + accessToken.token,
    });

    const items = response["items"] as Array<Record<string, unknown>>;
    const tracks: Array<Track> = [];
    for (const rawTrack of items) {
      const track = rawTrack["track"] as Record<string, unknown>;
      tracks.push({
        id: track["id"] as string,
        name: track["name"] as string,
        durationMs: track["duration_ms"] as number,
        imageURL: track["album"] as Record<string, unknown>["images"] as Array<Record<string, unknown>>[0]["url"] as string,
        artistName: track["artists"]as Array<Record<string, unknown>>[0]["name"] as string,
      });
    }
    
    return tracks;
  }

  async create(name: string): Promise<Playlist> {
    throw "";
  }
}
