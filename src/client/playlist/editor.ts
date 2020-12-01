import { Playlist } from "../../domain/playlist";
import { Track } from "../../domain/track";
import { IPlaylistEditor } from "../../usecase/editor";
import { IRequester } from "../../usecase/requester";
import { IVerifier } from "../../usecase/verifier";

const editPlaylistEndpoint = "/playlists/id";
const editPlaylistItemEndpoint = "/playlists/id/tracks";

export class PlaylistEditor implements IPlaylistEditor {
  constructor(requester: IRequester, verifier: IVerifier) {
    this.requester = requester;
    this.verifier = verifier;
  }

  private requester: IRequester;

  private verifier: IVerifier;

  async addTrack(playlist: Playlist, track: Track): Promise<Playlist> {
    const accessToken = await this.verifier.getAccessToken();
    const endpoint = editPlaylistItemEndpoint.replace("id", playlist.id);
    const response = await this.requester.post(
      endpoint,
      {},
      { uris: [track.uri] },
      { Authorization: "Bearer " + accessToken.token }
    );
    playlist.tracks.push(track);

    return playlist;
  }

  async deleteTrack(playlist: Playlist, track: Track): Promise<Playlist> {}

  async renamePlaylist(playlist: Playlist, name: string): Promise<Playlist> {}
}
