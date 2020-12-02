import React from "react";
import "./styles/TopPage.scss"
import {IAPIClient} from "../client/client";
import {reducer} from "../reducer/reducer";
import {TabBar} from "../components/tabBar/tabBar";
import {Icon} from "@material-ui/core";

interface Props {
  client: IAPIClient;
}

export const TopPage = (props: Props): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, { currentTab: "playlists" },);
  props.client.fetchPlaylist().then(playlists => {
    dispatch({ type: "updatePlaylists", playlists });
  });

  return (
    <div className="root">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <TabBar dispatch={dispatch} buttons={
        [
          {
            icon: (<Icon>source</Icon>),
            switchingTabName: "playlists"
          },
          {
            icon: (<Icon>search</Icon>),
            switchingTabName: "searcher",
          }
        ]
      }
      />
      {state.currentTab}
    </div>
  );
}