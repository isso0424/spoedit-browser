import { Track } from "./track";

export interface Album {
  name: string;

  tracks: Array<Track>;

  artistName: string;

  id: string;

  uri: string;

  imageURL: string;
}
