import { Invoice } from "./data-types/invoice";
import { Plays, getCalculatorsByType } from "./data-types/plays";
import { formatAmount } from "./data-types/amount";

function statement(invoice: Invoice, plays: Plays): string {
  let totalAmount = 0;
  let volumeCredits = 0;
  let map: Record<string, { audience: number; amount: number }> = {};

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    const calculator = getCalculatorsByType[play.type];
    const amount = calculator.amountCalculator(perf.audience);

    map[play.name] = { amount: amount, audience: perf.audience };

    volumeCredits += calculator.volumeCalculator(perf.audience);
    totalAmount += amount;
  }
  return createOutput(invoice.customer, totalAmount, volumeCredits, map);
}

function createOutput(
  customer: string,
  totalAmount: number,
  volumeCredits: number,
  map: Record<string, { audience: number; amount: number }>
): string {
  let result = `Statement for ${customer}\n`;
  for (const item in map) {
    result += ` ${item}: ${formatAmount(map[item].amount)} (${
      map[item].audience
    } seats)\n`;
  }
  result += `Amount owed is ${formatAmount(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}
export { statement };
