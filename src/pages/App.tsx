import React from "react";
import { PlaylistCreator } from "../client/playlist/creator";
import "./App.css";

function App() {
  const creator = new PlaylistCreator();
  creator.fetch().then((result) => console.log(result));
  return <div className="App">Hello world</div>;
}

export default App;
