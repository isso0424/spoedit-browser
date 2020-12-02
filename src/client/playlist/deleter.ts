import {Playlist} from "../../domain/playlist";
import {IPlaylistDeleter} from "../../usecase/deleter";
import {IRequester} from "../../usecase/requester";
import {IVerifier} from "../../usecase/verifier";

const endpointTemplate = "/playlists/id/followers";

export class PlaylistDeleter implements IPlaylistDeleter {
  constructor(verifier: IVerifier, requester: IRequester) {
    this.verifier = verifier;
    this.requester = requester;
  }

  private verifier: IVerifier;

  private requester: IRequester;

  async deletePlaylist(playlist: Playlist): Promise<Playlist> {
    const accessToken = await this.verifier.getAccessToken();
    const endpoint = endpointTemplate.replace("id", playlist.id);

    await this.requester.delete(endpoint, undefined, undefined, {
      Authorization: "Bearer " + accessToken.token,
    });

    return playlist;
  }
}
