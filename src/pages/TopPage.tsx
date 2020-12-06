import React from "react";
import "./styles/TopPage.scss"
import {reducer} from "../reducer/reducer";
import {TabBar} from "../components/tabBar/tabBar";
import {Icon} from "@material-ui/core";
import {Tab} from "../components/tab/tab";
import {IAPIClient} from "../usecase/client";
import {PlaylistDetail} from "../components/playlistDetail/playlistDetail";

interface Props {
  client: IAPIClient;
}

export const TopPage = (props: Props): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, {currentTab: "playlists"},);

  return (
    <div className="root">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      <TabBar dispatch={dispatch} buttons={
        [
          {
            icon: (<Icon>source</Icon>),
            switchingTabName: "playlists"
          },
          {
            icon: (<Icon>search</Icon>),
            switchingTabName: "searcher",
          },
          {
            icon: (<Icon>storage</Icon>),
            switchingTabName: "selectedTracks",
          }
        ]
      }
      />
      <Tab currentTab={state.currentTab} client={props.client} dispatch={dispatch} playlists={state.playlists}
           selectedTracks={state.selectedTracks} selectedPlaylist={state.selectedPlaylist}/>
      <PlaylistDetail client={props.client} playlist={state.selectedPlaylist} dispatch={dispatch}/>
    </div>
  );
}