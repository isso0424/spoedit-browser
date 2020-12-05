import React from "react";
import {IAPIClient} from "../../usecase/client";
import {Playlist} from "../../domain/playlist";
import {Action} from "../../reducer/reducer";
import {TracksGrid} from "../grid/tracksGrid";
import "./playlistDetail.scss";

interface Props {
  client: IAPIClient;
  playlist?: Playlist;
  dispatch: (action: Action) => void;
}

export const PlaylistDetail = (props: Props): JSX.Element => {
  return (
    <div className="playlistDetail">
      {
        props.playlist == null ?
          <h3>First, you have to select a playlist</h3> :
          <TracksGrid client={props.client} playlist={props.playlist} dispatch={props.dispatch}
        />
      }
    </div>
  );
};
