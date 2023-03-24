import { Skill, SkillLevel } from "../app/models";
import { calculateProgression, getThresholdValue } from "../app/utils";

const skills: Skill[] = [
  {
    id: "hoping",
    name: "Hoping",
    maxLevel: 1,
    tags: "survival",
    active: false,
    levelDescriptions: {
      1: "You have hope",
    },
    upgradeCosts: ["linear", 0, 0],
  },
  {
    id: "dreaming",
    name: "Dreaming",
    maxLevel: 1,
    tags: "survival",
    active: false,
    levelDescriptions: {
      1: "You have a dream",
    },
    upgradeCosts: ["linear", 0, 0],
  },
  {
    id: "grooming",
    name: "Grooming",
    maxLevel: 10,
    tags: "survival",
    active: true,
    levelDescriptions: {
      3: "You can make yourself look less like a caveman who just woke up from a long hibernation.",
      5: "You can make yourself look like you tried to make an effort but gave up halfway. You trim your hair and beard occasionally, but not enough to make a difference. You also forget to brush your teeth or use deodorant sometimes.",
      7: "You can make yourself look like a decent human being who cares about their appearance. You keep your hair and beard neat and tidy, and you use basic hygiene products regularly. You also wear clean and appropriate clothes for different occasions.",
      10: "You can make yourself look like a narcissist who spends more time in front of the mirror than with other people. You obsess over every detail of your hair and beard, and you use too many products that make you smell like a perfume shop. You also wear flashy and expensive clothes that draw attention to yourself.",
    },
    upgradeCosts: ["linear", 0, 0],
  },
  {
    id: "canpicking",
    name: "Can Picking",
    maxLevel: 10,
    tags: "survival",
    active: true,
    levelDescriptions: {
      3: "You can pick up a can if it's shoved into your face",
      5: "You can pick up a can even if it's 10 steps away",
      7: "You can pick up a can even if it's in a trashcan",
      10: "You can look for cans",
    },
    upgradeCosts: ["linear", 0, 64],
  },
  {
    id: "lockpicking",
    name: "Lock Picking",
    maxLevel: 10,
    tags: "survival",
    active: false,
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
    tags: "survival",
    active: false,
    levelDescriptions: {
      3: "You can throw a punch without pulling a muscle",
      5: "You can aim your punch",
      7: "You can actually hit someone with a punch",
      10: "You can punch and kick",
    },
    upgradeCosts: ["linear", 15, 3000],
  },
];

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
