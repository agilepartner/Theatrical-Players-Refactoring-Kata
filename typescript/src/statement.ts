import { Invoice } from "./data-types/invoice";
import { PlayType } from "./data-types/play-type";
import { Plays } from "./data-types/plays";


function statement(invoice: Invoice, plays: Plays) {
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
    const thisAmount = computePlayAmount(play.type, perf.audience);
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
    // print line for this order
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience
      } seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function computePlayAmount(playType: PlayType, audience: number,): number {
  switch (playType) {
    case "tragedy":
      return computeTragedyAmount(audience)
    case "comedy":
      return computeComedyAmount(audience)
    default:
      throw new Error(`unknown type: ${playType}`);
  }
}

function computeTragedyAmount(audience: number): number {
  let thisAmount = 40000;
  if (audience > 30) {
    thisAmount += 1000 * (audience - 30);
  }
  return thisAmount;
}


function computeComedyAmount(audience: number): number {
  let thisAmount = 30000;
  if (audience > 20) {
    thisAmount += 10000 + 500 * (audience - 20);
  }
  thisAmount += 300 * audience;
  return thisAmount;
}

export { statement };
