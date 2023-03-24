import { Investment } from "../app/models";

const investments: Investment[] = [
  {
    id: "comp1",
    name: "Breton LLC Stock",
    description: "This is a cool compar",
    minAmount: 100,
    bounds: [-10, 10],
  },
  {
    id: "comp2",
    name: "Big & Bind LLC Stock",
    description: "A cool compar",
    minAmount: 200,
    bounds: [-12, 12],
  },
];

const map = Object.fromEntries(investments.map((s) => [s.id, s]));

export function getInvestmentById(id: string) {
  return map[id];
}

export default investments;
