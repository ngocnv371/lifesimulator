import { Skill, SkillLevel } from "../app/models";
import { calculateProgression, getThresholdValue } from "../app/utils";

const skills: Skill[] = [
  {
    id: "canpicking",
    name: "Can Picking",
    maxLevel: 10,
    levelDescriptions: {
      3: "You can find cans if it's right in front of you",
      5: "You can find cans even if it's 10 steps away",
      7: "You can find cans even if it's in a trashcan",
      10: "You can find cans even if it's not there",
    },
    upgradeCosts: ["linear", 5, 64],
  },
  {
    id: "lockpicking",
    name: "Lock Picking",
    maxLevel: 10,
    levelDescriptions: {
      3: "You can pick a lock with a hammer",
      5: "You can pick a lock with a crowbar",
      7: "You can pick a lock with a fake key",
      10: "You can pick a lock with a shoelace",
    },
    upgradeCosts: ["linear", 10, 1000],
  },
  {
    id: "streetfighting",
    name: "Street Fighting",
    maxLevel: 10,
    levelDescriptions: {
      3: "You can throw a punch without pulling a muscle",
      5: "You can aim your punch",
      7: "You can actually hit someone with a punch",
      10: "You can punch and kick",
    },
    upgradeCosts: ["linear", 15, 3000],
  },
];

const map = Object.fromEntries(skills.map((s) => [s.id, s]));

export function getSkillById(id: string) {
  return map[id];
}

export function getSkillByLevel(id: string, level: number): SkillLevel {
  const skill = map[id];
  const description = getThresholdValue(skill.levelDescriptions, level);
  const cost = calculateProgression(skill.upgradeCosts, 0);
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
