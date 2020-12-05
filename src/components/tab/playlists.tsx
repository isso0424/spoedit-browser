import React, {useState} from "react";
import {Action} from "../../reducer/reducer";
import {Playlist} from "../../domain/playlist";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Icon,
  IconButton,
  Typography,
  useTheme,
  withStyles
} from "@material-ui/core";
import {IAPIClient} from "../../usecase/client";

interface Props {
  client: IAPIClient;
  dispatch: (action: Action) => void;
  currentPlaylists?: Array<Playlist>;
  selectedPlaylist?: Playlist;
}

interface PlaylistCardProps {
  dispatch: (action: Action) => void;
  playlist: Playlist;
  isSelected: boolean;
}

const PlaylistCard = (props: PlaylistCardProps): JSX.Element => {
  const theme = useTheme();

  const SelectedCard = withStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    }
  })(Card);
  const SelectedButton = withStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      '&:hover': {
        backgroundColor: theme.palette.background.default,
      }
    }
  })(Button);
  if (props.isSelected) {
    return (<SelectedCard key={props.playlist.id}>
      <CardContent>
        <Typography variant="h5" component="h4">{props.playlist.name}</Typography>
        <Typography variant="h6" component="p">track counts: {props.playlist.tracks.length}</Typography>
      </CardContent>
      <CardActions>
        <SelectedButton
          size="small"
          onClick={() => props.dispatch({type: "unselectPlaylist"})}
        >Unselect</SelectedButton>
      </CardActions>
    </SelectedCard>);
  }
  return (
    <Card key={props.playlist.id}>
      <CardContent>
        <Typography variant="h5" component="h4">{props.playlist.name}</Typography>
        <Typography variant="h6" component="p">track counts: {props.playlist.tracks.length}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => props.dispatch({type: "selectPlaylist", playlist: props.playlist})}
        >Select</Button>
      </CardActions>
    </Card>
  );
}

export const PlaylistsTab = (props: Props): JSX.Element => {
  const [state, setState] = useState({loading: false});
  if (props.currentPlaylists == null) {
    if (!state.loading) {
      props.client.fetchPlaylist().then(playlists => {
        props.dispatch({type: "updatePlaylists", playlists});
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
          props.dispatch({type: "resetPlaylists"})
        }}>
          <Icon>refresh</Icon>
        </IconButton>
        {
          props.currentPlaylists.map((playlist) => {
            return (
              <PlaylistCard
                key={playlist.id}
                dispatch={props.dispatch}
                playlist={playlist}
                isSelected={playlist.id == props.selectedPlaylist?.id}
              />
            );
          })
        }
      </Grid>
    </>
  );
};