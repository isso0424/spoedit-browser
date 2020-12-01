import React from "react";
import {IAPIClient} from "../client/client";
import {Playlist} from "../domain/playlist";

interface Props {
  client: IAPIClient;
}

interface State {
  playlists: Array<Playlist>;
}

export const TopPage = (props: Props): JSX.Element => {
  const [state, setState] = React.useState<State>({ playlists: [] });
  const playlistsComponent = state.playlists.length == 0 ? <p>Now loading...</p> : state.playlists.map(playlist => (
    <div key={playlist.id}>
      <li>
        <ul>id: {playlist.id}</ul>
        <ul>name: {playlist.name}</ul>
        <ul>description: {playlist.description}</ul>
      </li>
    </div>
  ));

  props.client.fetchPlaylist().then(playlists => {
    setState({ playlists });
  });

  return (
    <>
      Select edit playlist.
      {playlistsComponent}
    </>
  );
}