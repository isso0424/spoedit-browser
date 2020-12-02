import {Track} from "./track";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Array<Track>;
  uri: string;
}
