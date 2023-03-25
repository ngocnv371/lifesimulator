import { nanoid } from "@reduxjs/toolkit";
import faker from "faker";
import config from "../app/config";
import { Investment } from "../app/models";
import { addDays, intlFormat } from "date-fns";
import { fluctuate } from "../app/utils";

export function generateInvestment(): Investment {
  const inv: Investment = {
    id: nanoid(),
    type: "stock",
    name: faker.fake("{{company.companyName}} {{company.companySuffix}} Stock"),
    minAmount: faker.datatype.number({ min: 100, max: 99999 }),
    invested: 0,
    profit: {
      min: faker.datatype.number({ min: -20, max: 0 }),
      max: faker.datatype.number({ min: 0, max: 20 }),
    },
    description: faker.random.words(20),
    history: [],
  };
  // generate history 365 days
  const records = [];
  let time = new Date();
  let value = inv.minAmount;
  const { min, max } = inv.profit;
  for (let i = 0; i < config.investment.simulatedHistoryLength; i++) {
    time = addDays(time, -1);
    value = value + Math.floor((value * fluctuate(min, max)) / 100);
    records.push({
      time: +time,
      value,
    });
  }
  inv.history = records.reverse();
  return inv;
}
