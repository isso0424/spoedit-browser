import React from "react";
import "./App.css";
import {APIClient} from "../client/client";
import {Requester} from "../client/requester";
import {Verifier} from "../client/verifier";
import {PlaylistCreator} from "../client/playlist/creator";
import {PlaylistDeleter} from "../client/playlist/deleter";
import {PlaylistEditor} from "../client/playlist/editor";
import {Searcher} from "../client/playlist/searcher";
import {Simulate} from "react-dom/test-utils";

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
client.searchTrack("world.execute(me)").then(result => console.log(result));

const App = (): JSX.Element => {
  return <div className="App">Hello world</div>;
}

export default App;
