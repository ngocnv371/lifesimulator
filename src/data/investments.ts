import { nanoid } from "@reduxjs/toolkit";
import faker from "faker";
import config from "../app/config";
import { Investment } from "../app/models";
import { addDays, intlFormat } from "date-fns";
import { fluctuate } from "../app/utils";

function generateProfitHistory(
  profit: { min: number; max: number },
  amount: number
) {
  const records = [];
  let time = new Date();
  let value = amount;
  const { min, max } = profit;
  for (let i = 0; i < config.investment.simulatedHistoryLength; i++) {
    time = addDays(time, -1);
    value = value + Math.floor((value * fluctuate(min, max)) / 100);
    records.push({
      time: +time,
      value,
    });
  }
  return records.reverse();
}

export function generateInvestment(): Investment {
  const inv: Investment = {
    id: nanoid(),
    type: faker.random.arrayElement(["stock", "fund"]),
    name: faker.fake("{{company.companyName}} {{company.companySuffix}}"),
    minAmount: faker.datatype.number({ min: 100, max: 99999 }),
    invested: 0,
    profit: {
      min: faker.datatype.number({ min: -20, max: 0 }),
      max: faker.datatype.number({ min: 0, max: 20 }),
    },
    description: faker.random.words(20),
    history: [],
  };
  if (inv.type === "fund") {
    inv.name += " Fund";
  } else {
    inv.name += " Stock";
  }
  inv.history = generateProfitHistory(inv.profit, inv.minAmount);
  return inv;
}
