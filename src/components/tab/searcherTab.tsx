import React from "react";
import {IAPIClient} from "../../client/client";
import {Action} from "../../reducer/reducer";

interface Props {
  client: IAPIClient;
  dispatch: (action: Action) => void;
}

export const SearcherTab = (props: Props): JSX.Element => {
  return (<div/>);
};