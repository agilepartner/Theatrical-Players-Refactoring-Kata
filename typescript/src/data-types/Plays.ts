export type Plays = {
  [key: string]: {
    name: string;
    type: PlayType;
  };
};

export type PlayType = "tragedy" | "comedy";
