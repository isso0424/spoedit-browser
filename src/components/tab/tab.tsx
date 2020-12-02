import React from "react";
import {Action, TabName} from "../../reducer/reducer";
import {PlaylistsTab} from "./playlists";
import {IAPIClient} from "../../client/client";
import {SearcherTab} from "./searcherTab";

interface Props {
  currentTab: TabName;
  client: IAPIClient;
  dispatch: (action: Action) => void;
}

export const Tab = (props: Props): JSX.Element => {
  let tab: JSX.Element;
  switch (props.currentTab) {
    case "playlists":
      tab = <PlaylistsTab client={props.client} dispatch={props.dispatch}/>;
      break;
    case "searcher":
      tab = <SearcherTab client={props.client} dispatch={props.dispatch}/>;
      break;
  }
  return <div>{tab}</div>;
};