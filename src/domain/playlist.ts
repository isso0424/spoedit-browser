import { Track } from "./truck";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Array<Track>;
}
