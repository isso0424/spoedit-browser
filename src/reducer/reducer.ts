import {Playlist} from "../domain/playlist";
import {Track} from "../domain/track";

export interface State {
  playlists?: Array<Playlist>;
  selectedTracks?: Array<Track>;
}

type Action = updatePlaylists | selectTrack | clearSelected | unselectTrack;

interface updatePlaylists {
  type: "updatePlaylists";
  playlists: Array<Playlist>;
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

export const reducer = (state: State, action: Action): State => {
  const prevTracks = state.selectedTracks ?? [];
  switch (action.type) {
    case "updatePlaylists":
      return {
        ...state,
        playlists: action.playlists,
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
      }
  }
};