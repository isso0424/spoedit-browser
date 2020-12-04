import React, {useState} from "react";
import {Action} from "../../reducer/reducer";
import {Track} from "../../domain/track";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
  useTheme, withStyles
} from "@material-ui/core";
import {IAPIClient} from "../../usecase/client";

interface Props {
  client: IAPIClient;
  dispatch: (action: Action) => void;
  selectedTracks?: Array<Track>;
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

const TrackCard = (props: TrackCardProps): JSX.Element => {
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
  if (props.isSelected)
    return (
      <SelectedCard key={props.track.id}>
        <CardContent>
          <Typography variant="h5" component="h6">{props.track.name}</Typography>
          <Typography variant="h6" component="p">Artist {props.track.artistName}</Typography>
        </CardContent>
        <CardActions>
          <SelectedButton
            size="small"
            onClick={() => props.dispatch({ type: "unselectTrack", track: props.track })}
          >Unselect</SelectedButton>
        </CardActions>
      </SelectedCard>
    );
  return (
  <Card key={props.track.id}>
    <CardContent>
      <Typography variant="h5" component="h4">{props.track.name}</Typography>
      <Typography variant="h6" component="p">Artist {props.track.artistName}</Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        onClick={() => props.dispatch({ type: "selectTrack", track: props.track })}
      >Select</Button>
    </CardActions>
  </Card>
  );
};

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
          <TrackCard
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