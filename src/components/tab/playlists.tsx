import React, {useState} from "react";
import {Action} from "../../reducer/reducer";
import {Playlist} from "../../domain/playlist";
import {Button, Card, CardActions, CardContent, Grid, Icon, IconButton, Typography} from "@material-ui/core";
import {IAPIClient} from "../../usecase/client";

interface Props {
  client: IAPIClient;
  dispatch: (action: Action) => void;
  currentPlaylists?: Array<Playlist>;
}

export const PlaylistsTab = (props: Props): JSX.Element => {
  const [state, setState] = useState({loading: false});
  if (props.currentPlaylists == null) {
    if (!state.loading) {
      props.client.fetchPlaylist().then(playlists => {
        props.dispatch({ type: "updatePlaylists", playlists });
      });
      setState({loading: true});
    }
    return <p>Loading...</p>;
  }
  if (state.loading) setState({loading: false});
  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        spacing={3}
      >
        <IconButton onClick={() => {
          props.dispatch({ type: "resetPlaylists" })
        }}>
          <Icon>refresh</Icon>
        </IconButton>
        {
          props.currentPlaylists.map((playlist) => {
            return (
              <Card key={playlist.id}>
                <CardContent>
                  <Typography variant="h5" component="h4">{playlist.name}</Typography>
                  <Typography variant="h6" component="p">track counts: {playlist.tracks.length}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => props.dispatch({ type: "selectPlaylist", playlist })}
                  >Select</Button>
                </CardActions>
              </Card>
            );
          })
        }
      </Grid>
    </>
  );
};