import { Skill, SkillLevel } from "../app/models";
import { calculateProgression, getThresholdValue } from "../app/utils";
import rawSkills from "./scraped/skills.json";
import faker from "faker";

const skills: Skill[] = rawSkills.map((r) => ({
  id: r.name.toLocaleLowerCase(),
  name: r.name,
  levelDescriptions: { 0: r.description },
  maxLevel: 10,
  active: false,
  tags: "",
  upgradeCosts: ["linear", 1000, 1000 + faker.datatype.number(10000)],
}));

// pickpocket ->

const map = Object.fromEntries(skills.map((s) => [s.id, s]));

export function getSkillById(id: string) {
  return map[id];
}

export function getSkillByLevel(id: string, level: number): SkillLevel {
  const skill = map[id];
  const description = getThresholdValue(skill.levelDescriptions, level);
  const cost = calculateProgression(skill.upgradeCosts, level / skill.maxLevel);
  const canLevelUp = level < skill.maxLevel;
  return {
    ...skill,
    level,
    description,
    cost,
    canLevelUp,
  };
}

export default skills;
