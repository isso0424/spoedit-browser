import React from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {Action} from "../../../reducer/reducer";
import {Track} from "../../../domain/track";

interface Props {
  message: string;
  dispatch: (action: Action) => void;
  track: Track;
  action: Action;
}

export const TrackCard = (props: Props): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h6">{props.track.name}</Typography>
        <Typography variant="h6" component="p">Artist {props.track.artistName}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => props.dispatch(props.action)}
        >{props.message}</Button>
      </CardActions>
    </Card>
  );
}