import { Job } from "../app/models";

const jobs: Job[] = [
  {
    id: "canscollector",
    name: "Cans Collector",
    description: "Go find me some cans, I will give you some coins.",
    shiftLength: 8,
    salary: 10,
    requiredSkills: { canpicking: 1 },
  },
];

const map = Object.fromEntries(jobs.map((s) => [s.id, s]));

export function getJobById(id: string): Job {
  return map[id];
}

export function getJobsBySkills(skills: Record<string, number>): Job[] {
  return jobs.filter((job) => {
    for (const skillId in job.requiredSkills) {
      const requiredLevel = job.requiredSkills[skillId];
      const currentLevel = skills[skillId];
      console.log('check', {skillId, currentLevel, requiredLevel})
      if (!currentLevel || requiredLevel > currentLevel) {
        return false;
      }
    }
    return true;
  });
}
