export interface Skill {
  id: string;
  name: string;
  maxLevel: number;
  tags: string;
  active: boolean;
  description: string;
  /**
   * cost to unlock is `upgradeCost[0]` and to level up is `upgradeCost[level]`
   */
  upgradeCosts: Progression;
}

export type Curve = "linear" | "ease-out" | "ease-in-out" | "ease-in";

export type Progression = [curve: Curve, min: number, max: number];

export interface SkillLevel extends Omit<Skill, "upgradeCosts"> {
  level: number;
  description: string;
  cost: number;
  canLevelUp: boolean;
}

export interface Job {
  id: string;
  name: string;
  description: string;
  requiredSkills: Record<string, number>;
  salary: number;
  shiftLength: number;
}

export interface HistoryValue {
  time: number;
  value: number;
}
export interface Investment {
  id: string;
  name: string;
  type: "stock" | "fund" | "estate";
  description: string;
  minAmount: number;
  invested: number;
  profit: { min: number; max: number };
  history: HistoryValue[];
}
