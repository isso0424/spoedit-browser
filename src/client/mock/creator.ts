import {IPlaylistCreator} from "../../usecase/creator";
import {Playlist} from "../../domain/playlist";

export class MockPlaylistCreator implements IPlaylistCreator {
  async create(name: string): Promise<Playlist> {
    return {
      id: "created",
      name,
      description: "new playlist",
      tracks: [
      ],
      uri: "this is uri",
    };
  }

  async fetch(): Promise<Array<Playlist>> {

    return [
      {
        id: "firstPlaylist",
        name: "hoge",
        description: "fetched playlist 1",
        tracks: [
          {
            id: "firstTrack",
            name: "track1",
            durationMs: 10,
            artistName: "example",
            imageURL: "https://lohas.nicoseiga.jp/thumb/5089675i?",
            uri: "this is uri",
          },
          {
            id: "secondTrack",
            name: "track2",
            durationMs: 10,
            artistName: "example",
            imageURL: "https://lohas.nicoseiga.jp/thumb/4585095i?",
            uri: "this is uri",
          }
        ],
        uri: "this is uri",
      },
      {
        id: "secondPlaylist",
        name: "hoge",
        description: "fetched playlist 1",
        tracks: [
          {
            id: "thirdTrack",
            name: "track1",
            durationMs: 10,
            artistName: "example",
            imageURL: "https://lohas.nicoseiga.jp/thumb/5089675i?",
            uri: "this is uri",
          },
          {
            id: "forthTrack",
            name: "track2",
            durationMs: 10,
            artistName: "example",
            imageURL: "https://lohas.nicoseiga.jp/thumb/4585095i?",
            uri: "this is uri",
          }
        ],
        uri: "this is uri",
      }
    ];
  }

}