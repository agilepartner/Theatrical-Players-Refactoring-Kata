export type Plays = {
  [key: string]: {
    name: string;
    type: PlayType;
  };
};

export type PlayType = "tragedy" | "comedy";

export type CalculateAmountMap = Record<PlayType, (audience: number) => number>;

export function calculateAmount(): CalculateAmountMap {
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

export type CalculateCreditMap = Record<PlayType, (audience: number) => number>;

export function calculatePlayCredit(): CalculateCreditMap {
  return {
    comedy: calculateComedyCredit,
    tragedy: calculateDefaultCredit
  }
}

function calculateComedyCredit(audience: number): number {
  return calculateDefaultCredit(audience) + winCreditForEvery5Attendees(audience);
}

function winCreditForEvery5Attendees(audience: number) {
  return Math.floor(audience / 5);
}

function calculateDefaultCredit(audience: number): number {
  return Math.max(audience - 30, 0);
}