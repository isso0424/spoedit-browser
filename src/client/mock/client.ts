import {APIClient} from "../api/client";
import {MockPlaylistCreator} from "./creator";
import {MockPlaylistEditor} from "./editor";
import {MockPlaylistDeleter} from "./deleter";
import {MockSearcher} from "./searcher";

const creator = new MockPlaylistCreator();
const editor = new MockPlaylistEditor();
const deleter = new MockPlaylistDeleter();
const searcher = new MockSearcher();

export const mockClient = new APIClient(
  creator,
  editor,
  deleter,
  searcher,
);