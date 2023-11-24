export type Plays = Record<
  string,
  {
    name: string;
    type: PlayType;
  }
>;

const playTypes = ["tragedy", "comedy"] as const;

export type PlayType = (typeof playTypes)[number];


const isPlayType = (test: string): test is PlayType => {
  return (playTypes as unknown as string[]).includes(test);
};

type AmountCalculator = (audience: number) => number;
type VolumeCalculator = (audience: number) => number;
type PlayCalculators = {
  amountCalculator: AmountCalculator;
  volumeCalculator: VolumeCalculator;
};
export type CalculatorMap = Record<PlayType, PlayCalculators>;

const calculatorsByType: CalculatorMap = {
  comedy: {
    amountCalculator: calculateAmountFactory().forComedy,
    volumeCalculator: calculateVolumeCredit().forComedy,
  },
  tragedy: {
    amountCalculator: calculateAmountFactory().forTragedy,
    volumeCalculator: calculateVolumeCredit().forDefault,
  },
};

export const getCalculator = (playType: string): PlayCalculators => {
  if (!isPlayType(playType)) {
    throw "XYZ";
  }
  return calculatorsByType[playType];
};

function calculateAmountFactory() {
  function forComedy(audience: number): number {
    let thisAmount = 30000;
    if (audience > 20) {
      thisAmount += 10000 + 500 * (audience - 20);
    }
    thisAmount += 300 * audience;
    return thisAmount;
  }

  function forTragedy(audience: number): number {
    let thisAmount = 40000;
    if (audience > 30) {
      thisAmount += 1000 * (audience - 30);
    }
    return thisAmount;
  }

  return {
    forComedy,
    forTragedy,
  };
}

function calculateVolumeCredit() {
  function forComedy(audience: number): number {
    return forDefault(audience) + winCreditForEvery5Attendees(audience);
  }

  function winCreditForEvery5Attendees(audience: number) {
    return Math.floor(audience / 5);
  }

  function forDefault(audience: number): number {
    return Math.max(audience - 30, 0);
  }
  return {
    forDefault,
    forComedy,
  };
}
