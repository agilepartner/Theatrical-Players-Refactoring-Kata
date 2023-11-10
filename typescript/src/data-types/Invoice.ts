import { Performance } from "./performance";

export type Invoice = {
  customer: string;
  performances: Performance[];
};
