import { Job } from "../app/models";
import rawJobs from "./scraped/jobs.json";

const jobs: Job[] = rawJobs.map((r) => ({
  id: r.name.toLocaleLowerCase(),
  name: r.name,
  description: r.description,
  shiftLength: 8,
  salary: 10,
  requiredSkills: Object.fromEntries(r.requiredSkills.map((k) => [k, 1])),
}));

const map = Object.fromEntries(jobs.map((s) => [s.id, s]));

export function getJobById(id: string): Job {
  return map[id];
}

export function getJobsBySkills(skills: Record<string, number>): Job[] {
  return jobs.filter((job) => {
    for (const skillId in job.requiredSkills) {
      const requiredLevel = job.requiredSkills[skillId];
      const currentLevel = skills[skillId];
      if (!currentLevel || requiredLevel > currentLevel) {
        return false;
      }
    }
    return true;
  });
}
