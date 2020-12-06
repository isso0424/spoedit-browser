import React, {useState} from "react";
import {Action} from "../../reducer/reducer";
import {Track} from "../../domain/track";
import {
  Grid,
  Icon,
  IconButton,
  TextField,
} from "@material-ui/core";
import {IAPIClient} from "../../usecase/client";
import {Playlist} from "../../domain/playlist";
import {SelectedTrackCard} from "../card/track/selected";
import {TrackCard} from "../card/track/normal";

interface Props {
  client: IAPIClient;
  dispatch: (action: Action) => void;
  selectedTracks?: Array<Track>;
  selectedPlaylist?: Playlist;
  playlists?: Array<Playlist>
}

interface State {
  tracks: Array<Track>;
  loading: boolean;
  keyword: string;
}

interface TrackCardProps {
  dispatch: (action: Action) => void;
  track: Track;
  isSelected: boolean;
}

const SearcherTrackCard = (props: TrackCardProps): JSX.Element => {
  return props.isSelected ? <SelectedTrackCard track={props.track} dispatch={props.dispatch} /> : (
    <TrackCard
      message="Select"
      onClickEvent={() => {
        props.dispatch({ type: "selectTrack", track: props.track });
      }}
      track={props.track}
    />
  );
};

export const SearcherTab = (props: Props): JSX.Element => {
  const [state, setState] = useState<State>({tracks: [], loading: false, keyword: ""});
  if (state.loading && state.tracks.length > 0) setState({...state, loading: false});
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="flex-start"
      spacing={3}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <TextField
          onChange={
            (e) =>
              setState({...state, keyword: e.target.value})
          }
          classes={{root: "searchField"}}
        />
        <IconButton onClick={() => {
          props.client.searchTrack(state.keyword).then(tracks => setState({...state, loading: false, tracks}));
          setState({...state, loading: true});
        }}>
          <Icon>search</Icon>
        </IconButton>
        <IconButton onClick={() => {
          if (props.selectedPlaylist == null) return;
          if (props.selectedTracks == null) return;
          props.client.addTrack(props.selectedPlaylist, props.selectedTracks).then(playlist => {
            if (props.playlists == null) return;
            const playlistIndex = props.playlists.findIndex(p => p.id == playlist.id);
            const newPlaylist = props.playlists;
            newPlaylist[playlistIndex] = playlist;
            console.log(props.selectedTracks);
            props.dispatch({ type: "updatePlaylists", playlists: newPlaylist });
          });
          props.dispatch({ type: "clearSelected" });
        }}>
          <Icon>add</Icon>
        </IconButton>
      </Grid>
      {
        state.loading ? <p>searching...</p> : state.tracks.map(track =>
          <SearcherTrackCard
            key={track.id}
            dispatch={props.dispatch}
            track={track}
            isSelected={props.selectedTracks?.find(t => t.id == track.id) != null}
          />
        )
      }
    </Grid>
  );
};