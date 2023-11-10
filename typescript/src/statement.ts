import { Invoice } from "./data-types/Invoice";
import { Performance } from "./data-types/Performance";
import { Plays, PlayType, calculateAmount, calculatePlayCredit } from "./data-types/Plays";

function statement(invoice: Invoice, plays: Plays): string {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    const amount = calculateAmount()[play.type](perf.audience);

    volumeCredits += calculatePlayCredit()[play.type](perf.audience);;

    // print line for this order
    result += ` ${play.name}: ${format(amount / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += amount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

export { statement };


