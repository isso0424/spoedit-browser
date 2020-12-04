import React from "react";
import {Action, TabName} from "../../reducer/reducer";
import {PlaylistsTab} from "./playlists";
import {SearcherTab} from "./searcherTab";
import "./tab.scss"
import {Playlist} from "../../domain/playlist";
import {Track} from "../../domain/track";
import {IAPIClient} from "../../usecase/client";

interface Props {
  currentTab: TabName;
  client: IAPIClient;
  dispatch: (action: Action) => void;
  playlists?: Array<Playlist>;
  selectedTracks?: Array<Track>;
}

export const Tab = (props: Props): JSX.Element => {
  let tab: JSX.Element;
  switch (props.currentTab) {
    case "playlists":
      tab = <PlaylistsTab client={props.client} dispatch={props.dispatch} currentPlaylists={props.playlists}/>;
      break;
    case "searcher":
      tab = <SearcherTab client={props.client} dispatch={props.dispatch} selectedTracks={props.selectedTracks}/>;
      break;
  }
  return <div className="tabRoot">{tab}</div>;
};