import { PlayType } from "./play-type";

export type Plays = {
  [key: string]: {
    name: string;
    type: PlayType;
  };
};