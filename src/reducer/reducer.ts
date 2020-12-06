import {Playlist} from "../domain/playlist";
import {Track} from "../domain/track";

export type TabName = "playlists" | "searcher" | "selectedTracks";

export interface State {
  playlists?: Array<Playlist>;
  selectedPlaylist?: Playlist;
  selectedTracks?: Array<Track>;
  currentTab: TabName;
}

export type Action =
  updatePlaylists
  | selectTrack
  | clearSelected
  | unselectTrack
  | switchTabs
  | selectPlaylist
  | resetPlaylists
  | unselectPlaylist
  | deleteTrack;

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

interface unselectPlaylist {
  type: "unselectPlaylist";
}

interface deleteTrack {
  type: "deleteTrack";
  track: Track;
}

export const reducer = (state: State, action: Action): State => {
  const prevTracks = state.selectedTracks ?? [];
  let newTracks = [];
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
        selectedTracks: [],
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
    case "unselectPlaylist":
      return {
        ...state,
        selectedPlaylist: undefined,
      }
    case "deleteTrack":
      if (state.selectedPlaylist == null) return state;
      newTracks = state.selectedPlaylist.tracks.filter(t => action.track.id != t.id);
      return {
        ...state,
        selectedPlaylist: {
          ...state.selectedPlaylist,
          tracks: newTracks,
        },
      }
  }
};