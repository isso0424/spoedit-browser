import React from "react";
import "./styles/App.scss"
import {APIClient} from "../client/api/client";
import {Requester} from "../client/api/requester";
import {Verifier} from "../client/api/verifier";
import {PlaylistCreator} from "../client/api/playlist/creator";
import {PlaylistDeleter} from "../client/api/playlist/deleter";
import {PlaylistEditor} from "../client/api/playlist/editor";
import {Searcher} from "../client/api/playlist/searcher";
import {TopPage} from "./TopPage";
import {mockClient} from "../client/mock/client";

const requester = new Requester();
const verifier = new Verifier();
const creator = new PlaylistCreator(requester, verifier);
const deleter = new PlaylistDeleter(verifier, requester);
const editor = new PlaylistEditor(requester, verifier);
const searcher = new Searcher(requester, verifier);

const client = new APIClient(
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
