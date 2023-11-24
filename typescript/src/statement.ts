import { Invoice } from "./data-types/Invoice";
import { Performance } from "./data-types/Performance";
import {
  Plays,
  PlayType,
  calculateAmount,
  calculatePlayCredit,
} from "./data-types/Plays";
import { formattedAmount } from "./data-types/format";

function statement(invoice: Invoice, plays: Plays): string {
  let resultAndTotalAmount = invoice.performances
    .map((item) => getPerformanceData(item, plays))
    .reduce(
      (acc, item) =>
        (acc = {
          amount: acc.amount + item.amount,
          credit: acc.credit + item.credit,
          result: acc.result + item.result,
        })
    );
  return getOutput(invoice.customer, resultAndTotalAmount);
}
type PerformanceData = {
  result: string;
  amount: number;
  credit: number;
};

function getOutput(customer: string, performanceData: PerformanceData): string {
  let result = `Statement for ${customer}\n`;
  result += performanceData.result;
  result += `Amount owed is ${formattedAmount(performanceData.amount)}\n`;
  result += `You earned ${performanceData.credit} credits\n`;
  return result;
}

function getPerformanceData(
  performance: Performance,
  plays: Plays
): PerformanceData {
  const play = plays[performance.playID];
  const amount = calculateAmount()[play.type](performance.audience);
  return {
    amount: amount,
    credit: calculatePlayCredit()[play.type](performance.audience),
    result: ` ${play.name}: ${formattedAmount(amount)} (${
      performance.audience
    } seats)\n`,
  };
}

export { statement };
