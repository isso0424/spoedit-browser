import React from "react";
import {Action, TabName} from "../../reducer/reducer";
import {IconButton} from "@material-ui/core";

import "./tabBar.scss";

interface ButtonProps {
  icon: JSX.Element;
  switchingTabName: TabName;
}

interface Props {
  dispatch: (action: Action) => void;
  buttons: Array<ButtonProps>;
}

export const TabBar = (props: Props): JSX.Element => {
  return (
    <div className="tabBar">
      {
        props.buttons.map((button, index) => {
          return (
            <IconButton
              onClick={() => props.dispatch({type: "switchTabs", newTabName: button.switchingTabName})}
              key={index}
              className="tabButton"
            >
              {button.icon}
            </IconButton>
          );
        })
      }
    </div>
  );
};