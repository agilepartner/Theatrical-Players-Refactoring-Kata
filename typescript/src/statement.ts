import { Invoice } from "./data-types/Invoice";
import { Performance, PerformanceData } from "./data-types/Performance";
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

function getOutput(customer: string, performanceData: PerformanceData): string {
  return (
    `Statement for ${customer}\n` +
    performanceData.result +
    `Amount owed is ${formattedAmount(performanceData.amount)}\n` +
    `You earned ${performanceData.credit} credits\n`
  );
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
