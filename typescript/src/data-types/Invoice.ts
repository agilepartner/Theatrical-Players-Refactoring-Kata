import { Performance } from "./Performance";

export type Invoice = {
  customer: string;
  performances: Performance[];
};
