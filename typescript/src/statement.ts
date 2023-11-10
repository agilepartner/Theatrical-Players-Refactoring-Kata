import { Invoice } from "./data-types/Invoice";
import { Performance } from "./data-types/Performance";
import { Plays, PlayType, calculateAmount } from "./data-types/Plays";

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
    const thisAmount = calculateAmount()[play.type](perf.audience);

    // add volume credits
    volumeCredits += calculateVolumeCredit( perf.audience, play.type);

    // print line for this order
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function calculateVolumeCredit(audience: number, type: PlayType) {

  let volumeCredits = Math.max(audience - 30, 0);

  // add extra credit for every ten comedy attendees
  if ("comedy" === type) volumeCredits += Math.floor(audience / 5);
  return volumeCredits;
}

export { statement };


