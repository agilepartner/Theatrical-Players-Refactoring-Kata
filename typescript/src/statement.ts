import { Invoice } from "./data-types/invoice";
import { Plays, getCalculator } from "./data-types/plays";
import { formatAmount } from "./data-types/amount";

function statement(invoice: Invoice, plays: Plays): string {
  let perfomance: myType = {};
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];

    const calculators = getCalculator(play.type);

    const amount = calculators.amountCalculator(perf.audience);
    const credit = calculators.volumeCalculator(perf.audience);

    perfomance[play.name] = {
      amount: amount,
      audience: perf.audience,
      credit: credit,
    };
  }
  return createOutput(invoice.customer, perfomance);
}

function createOutput(customer: string, map: myType): string {
  let result = `Statement for ${customer}\n`;

  result += getPlay(map);
  result += `Amount owed is ${formatAmount(getTotalAmount(map))}\n`;
  result += `You earned ${getTotalCredit(map)} credits\n`;
  return result;
}
type myType = Record<
  string,
  { audience: number; amount: number; credit: number }
>;

function getPlay(map: myType): string {
  return Object.keys(map).reduce<string>((acc, item) => {
    return (acc += formatPlayOutput(
      item,
      map[item].amount,
      map[item].audience
    ));
  }, "");
}

function formatPlayOutput(name: string, amount: number, audience: number) {
  return ` ${name}: ${formatAmount(amount)} (${audience} seats)\n`;
}

function getTotalAmount(map: myType): number {
  return Object.keys(map).reduce<number>((acc, item) => {
    return acc + map[item].amount;
  }, 0);
}

function getTotalCredit(map: myType): number {
  return Object.keys(map).reduce<number>((acc, item) => {
    return acc + map[item].credit;
  }, 0);
}

export { statement };
