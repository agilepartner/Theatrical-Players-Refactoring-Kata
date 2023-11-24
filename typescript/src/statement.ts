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
  function toTotal(performance: Performance, plays: Plays) {
    const play = plays[performance.playID];
    const amount = calculateAmount()[play.type](performance.audience);
    return {
      amount: amount,
      credit: calculatePlayCredit()[play.type](performance.audience),
      resultString: ` ${play.name}: ${formattedAmount(amount)} (${
        performance.audience
      } seats)\n`,
    };
  }

  let resultAndTotalAmount = invoice.performances
    .map((item) => toTotal(item, plays))
    .reduce(
      (acc, item) =>
        (acc = {
          amount: acc.amount + item.amount,
          credit: acc.credit + item.credit,
          resultString: acc.resultString + item.resultString,
        })
    );

  let result = `Statement for ${invoice.customer}\n`;
  result += resultAndTotalAmount.resultString;
  result += `Amount owed is ${formattedAmount(resultAndTotalAmount.amount)}\n`;
  result += `You earned ${resultAndTotalAmount.credit} credits\n`;
  return result;
}

export { statement };
