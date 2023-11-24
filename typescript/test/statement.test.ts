import { Invoice } from "../src/data-types/invoice";
import { Plays } from "../src/data-types/plays";
import { statement } from "../src/statement";
import fs from "fs";

test("example statement", () => {
  const invoice: Invoice = JSON.parse(
    fs.readFileSync("test/invoice.json", "utf8")
  );
  const plays: Plays = JSON.parse(
    fs.readFileSync("test/plays.json", "utf8")
  ) as Plays;
  expect(statement(invoice, plays)).toMatchSnapshot();
});
