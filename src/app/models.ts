export interface Skill {
  id: string;
  name: string;
  maxLevel: number;
  /**
   * description for a certain level threshold
   * `{3: 'good', 6: 'very good'}` means 'good' is the description for level 1, 2, 3
   */
  levelDescriptions: Record<number, string>;
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
