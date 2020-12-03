import React, {useState} from "react";
import {IAPIClient} from "../../client/client";
import {Action} from "../../reducer/reducer";
import {Track} from "../../domain/track";
import {Button, Card, CardActions, CardContent, Grid, Icon, IconButton, TextField, Typography} from "@material-ui/core";

interface Props {
  client: IAPIClient;
  dispatch: (action: Action) => void;
  selectedTracks: Array<Track>;
}

interface State {
  tracks: Array<Track>;
  loading: boolean;
  keyword: string;
}

export const SearcherTab = (props: Props): JSX.Element => {
  const [state, setState] = useState<State>({ tracks: [], loading: false, keyword: "" });
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
          props.client.searchTrack(state.keyword).then(tracks => setState({...state, loading: false, tracks }));
          setState({...state, loading: true});
        }}>
          <Icon>search</Icon>
        </IconButton>
      </Grid>
      {
        state.loading ? <p>searching...</p> : state.tracks.map(track =>
          <Card key={track.id} classes={{root: ""}}>
            <CardContent>
              <Typography variant="h5" component="h4">{track.name}</Typography>
              <Typography variant="h6" component="p">Artist {track.artistName}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => props.dispatch({ type: "selectTrack", track })}
              >Select</Button>
            </CardActions>
          </Card>
        )
      }
    </Grid>
  );
};