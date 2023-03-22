export interface Skill {
  id: string;
  name: string;
  maxLevel: number;
  /**
   * description for a certain level threshold
   * `{3: 'good', 6: 'very good'}` means 'good' is the description for level 1, 2, 3
   */
  leveldescriptions: Record<number, string>;
  /**
   * cost to unlock is `upgradeCost[0]` and to level up is `upgradeCost[level]`
   */
  upgradeCosts: Progression;
}

export type Curve = "linear" | "ease-out" | "ease-in-out" | "ease-in";

export type Progression = [curve: Curve, min: number, max: number];
