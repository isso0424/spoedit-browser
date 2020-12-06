import React from "react";
import {Action, TabName} from "../../reducer/reducer";
import {PlaylistsTab} from "./playlists";
import {SearcherTab} from "./searcherTab";
import "./tab.scss"
import {Playlist} from "../../domain/playlist";
import {Track} from "../../domain/track";
import {IAPIClient} from "../../usecase/client";
import {SelectedTracksTab} from "./selectedTracksTab";
import {Box} from "@material-ui/core";

interface Props {
  currentTab: TabName;
  client: IAPIClient;
  dispatch: (action: Action) => void;
  playlists?: Array<Playlist>;
  selectedTracks?: Array<Track>;
  selectedPlaylist?: Playlist;
}

export const Tab = (props: Props): JSX.Element => {
  let tab: JSX.Element;
  switch (props.currentTab) {
    case "playlists":
      tab = <PlaylistsTab client={props.client} dispatch={props.dispatch} currentPlaylists={props.playlists}
                          selectedPlaylist={props.selectedPlaylist}/>;
      break;
    case "searcher":
      tab = <SearcherTab client={props.client} dispatch={props.dispatch} selectedTracks={props.selectedTracks} playlists={props.playlists} selectedPlaylist={props.selectedPlaylist}/>;
      break;
    case "selectedTracks":
      tab = <SelectedTracksTab dispatch={props.dispatch} selectedTracks={props.selectedTracks} />;
      break;
  }
  return <Box className="tabRoot">{tab}</Box>;
};