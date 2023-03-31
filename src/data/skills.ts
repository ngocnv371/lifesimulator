import { Skill, SkillLevel } from "../app/models";
import { calculateProgression, getThresholdValue } from "../app/utils";
import rawSkills from "./raw/skills.json";
import faker from "faker";

const skills: Skill[] = rawSkills.map((r) => ({
  id: r.name.toLocaleLowerCase(),
  name: r.name,
  description: r.description,
  maxLevel: 10,
  active: false,
  tags: "",
  upgradeCosts: ["linear", 1000, 1000 + faker.datatype.number(10000)],
  requiredSkills: r.requiredSkills,
  tier: 1
}));

// pickpocket ->

const map = Object.fromEntries(skills.map((s) => [s.id, s]));

export function getSkillById(id: string) {
  const item = map[id.toLocaleLowerCase()];
  if (!item) {
    throw new Error(`skill not found: ${id}`)
  }
  return item;
}

export function getSkillByLevel(id: string, level: number): SkillLevel {
  const skill = map[id];
  const cost = calculateProgression(skill.upgradeCosts, level / skill.maxLevel);
  const canLevelUp = level < skill.maxLevel;
  return {
    ...skill,
    level,
    description: skill.description,
    cost,
    canLevelUp,
  };
}

export default skills;
