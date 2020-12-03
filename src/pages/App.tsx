import React from "react";
import "./styles/App.scss"
import {APIClient} from "../client/client";
import {Requester} from "../client/requester";
import {Verifier} from "../client/verifier";
import {PlaylistCreator} from "../client/playlist/creator";
import {PlaylistDeleter} from "../client/playlist/deleter";
import {PlaylistEditor} from "../client/playlist/editor";
import {Searcher} from "../client/playlist/searcher";
import {TopPage} from "./TopPage";

const requester = new Requester();
const verifier = new Verifier();
const creator = new PlaylistCreator(requester, verifier);
const deleter = new PlaylistDeleter(verifier, requester);
const editor = new PlaylistEditor(requester, verifier);
const searcher = new Searcher(requester, verifier);

const client = new APIClient(
  verifier,
  creator,
  editor,
  deleter,
  searcher,
);

const App = (): JSX.Element => {
  return (
    <div className="App">
      <TopPage client={client}/>
    </div>
  );
}

export default App;
