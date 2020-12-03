import React, {ChangeEvent, useState} from "react";
import {IAPIClient} from "../../client/client";
import {Action} from "../../reducer/reducer";
import {Track} from "../../domain/track";
import {Button, Card, CardActions, CardContent, Grid, Icon, IconButton, Typography} from "@material-ui/core";
import {TextFields} from "@material-ui/icons";

interface Props {
  client: IAPIClient;
  dispatch: (action: Action) => void;
}

interface State {
  tracks: Array<Track>;
  loading: boolean;
  keyword: string;
}

export const SearcherTab = (props: Props): JSX.Element => {
  const [state, setState] = useState<State>({ tracks: [], loading: false, keyword: "" });
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
        <TextFields
          onChange={
            (e) =>
              setState({...state, keyword: (e as unknown as ChangeEvent<HTMLInputElement>).target.value})
          }
        />
        <IconButton onClick={() => {
          props.client.searchTrack(state.keyword).catch(tracks => setState({...state, loading: false, tracks }));
          setState({...state, loading: true});
        }}>
          <Icon>search</Icon>
        </IconButton>
      </Grid>
      {
        state.loading ? <p>searching...</p> : state.tracks.map(track =>
          <Card key={track.id}>
            <CardContent>
              <Typography variant="h5" component="h4">{track.name}</Typography>
              <Typography variant="h6" component="p">track counts: {playlist.tracks.length}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => props.dispatch({ type: "selectPlaylist", playlist })}
              >Select</Button>
            </CardActions>
          </Card>
        )
      }
    </Grid>
  );
};