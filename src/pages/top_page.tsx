import React from "react";
import {IAPIClient} from "../client/client";
import {reducer} from "../reducer/reducer";

interface Props {
  client: IAPIClient;
}

export const TopPage = (props: Props): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, {});
  const playlistsComponent = state.playlists == null ? <p>Now loading...</p> : state.playlists.map(playlist => (
    <div key={playlist.id}>
      <li>
        <ul>id: {playlist.id}</ul>
        <ul>name: {playlist.name}</ul>
        <ul>description: {playlist.description}</ul>
      </li>
    </div>
  ));

  props.client.fetchPlaylist().then(playlists => {
    dispatch({ type: "updatePlaylists", playlists });
  });

  return (
    <>
      Select edit playlist.
      {playlistsComponent}
    </>
  );
}