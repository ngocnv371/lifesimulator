import { nanoid } from "@reduxjs/toolkit";
import faker from "faker";
import { Investment } from "../app/models";

function generateStock(): Investment {
  const inv: Investment = {
    id: nanoid(),
    type: 'stock',
    name: faker.fake("{{company.companyName}} {{company.companySuffix}} Stock"),
    minAmount: faker.datatype.number({ min: 100, max: 99999 }),
    bounds: [
      faker.datatype.number({ min: -20, max: 0 }),
      faker.datatype.number({ min: 0, max: 20 }),
    ],
    description: faker.random.words(20),
  };
  return inv;
}

const investments: Investment[] = [
  generateStock(),
  generateStock(),
  generateStock(),
  generateStock(),
  generateStock(),
];

const map = Object.fromEntries(investments.map((s) => [s.id, s]));

export function getInvestmentById(id: string) {
  return map[id];
}

export default investments;
