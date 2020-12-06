import React from "react";
import {Button, Card, CardActions, CardContent, Typography, useTheme, withStyles} from "@material-ui/core";
import {Track} from "../../../domain/track";
import {Action} from "../../../reducer/reducer";

interface Props {
  track: Track;
  dispatch: (action: Action) => void;
}

export const SelectedTrackCard = (props: Props): JSX.Element => {
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
  return (
    <SelectedCard key={props.track.id}>
      <CardContent>
        <Typography variant="h5" component="h6">{props.track.name}</Typography>
        <Typography variant="h6" component="p">Artist {props.track.artistName}</Typography>
      </CardContent>
      <CardActions>
        <SelectedButton
          size="small"
          onClick={() => props.dispatch({type: "unselectTrack", track: props.track})}
        >Unselect</SelectedButton>
      </CardActions>
    </SelectedCard>
  );
}