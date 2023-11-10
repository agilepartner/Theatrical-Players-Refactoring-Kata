export type Plays = {
  [key: string]: {
    name: string;
    type: PlayType;
  };
};

export type PlayType = "tragedy" | "comedy";

export type PlayMap = Record<PlayType, (audience: number) => number>;

export function calculateAmount(): PlayMap {
  return {
    comedy: calculateComedyAmount,
    tragedy: calculateTragedyAmount
  }
}

function calculateComedyAmount(audience: number): number {
  let thisAmount = 30000;
  if (audience > 20) {
    thisAmount += 10000 + 500 * (audience - 20);
  }
  thisAmount += 300 * audience;
  return thisAmount;
}

function calculateTragedyAmount(audience: number): number {
  let thisAmount = 40000;
  if (audience > 30) {
    thisAmount += 1000 * (audience - 30);
  }
  return thisAmount;
}