import {Playlist} from "../domain/playlist";
import {Track} from "../domain/track";

export type TabName = "playlists" | "searcher";

export interface State {
  playlists?: Array<Playlist>;
  selectedPlaylist?: Playlist;
  selectedTracks?: Array<Track>;
  currentTab: TabName;
}

export type Action = updatePlaylists | selectTrack | clearSelected | unselectTrack | switchTabs | selectPlaylist | resetPlaylists;

interface updatePlaylists {
  type: "updatePlaylists";
  playlists: Array<Playlist>;
}

interface resetPlaylists {
  type: "resetPlaylists";
}

interface selectTrack {
  type: "selectTrack";
  track: Track;
}

interface unselectTrack {
  type: "unselectTrack";
  track: Track;
}

interface clearSelected {
  type: "clearSelected";
}

interface switchTabs {
  type: "switchTabs";
  newTabName: TabName;
}

interface selectPlaylist {
  type: "selectPlaylist";
  playlist: Playlist;
}

export const reducer = (state: State, action: Action): State => {
  const prevTracks = state.selectedTracks ?? [];
  switch (action.type) {
    case "updatePlaylists":
      console.log(action.playlists);
      return {
        ...state,
        playlists: action.playlists.concat(),
      };
    case "selectTrack":
      prevTracks.push(action.track);
      return {
        ...state,
        selectedTracks: prevTracks,
      };
    case "clearSelected":
      return {
        ...state,
        selectedTracks: undefined,
      };
    case "unselectTrack":
      return {
        ...state,
        selectedTracks: prevTracks.filter(track => track.id != action.track.id),
      };
    case "switchTabs":
      return {
        ...state,
        currentTab: action.newTabName,
      };
    case "selectPlaylist":
      return {
        ...state,
        selectedPlaylist: action.playlist,
      };
    case "resetPlaylists":
      return {
        ...state,
        playlists: undefined,
      }
  }
};