import { Job } from "../app/models";
import rawJobs from "./raw/jobs.json";

export const jobs: Job[] = rawJobs
  .map((r) => ({
    id: r.name.toLocaleLowerCase(),
    name: r.name,
    description: r.description,
    shiftLength: 8,
    salary: r.salary,
    requiredSkills: Object.fromEntries(r.requiredSkills.map((k) => [k, 1])),
  }))
  .sort((a, b) => a.salary - b.salary);

const map = Object.fromEntries(jobs.map((s) => [s.id, s]));

export function getJobById(id: string): Job {
  return map[id];
}

export function isQualified(job: Job, skills: Record<string, number>): boolean {
  for (const skillId in job.requiredSkills) {
    const requiredLevel = job.requiredSkills[skillId];
    const currentLevel = skills[skillId];
    if (!currentLevel || requiredLevel > currentLevel) {
      return false;
    }
  }

  return true;
}

export function getJobs(
  skills: Record<string, number>
): (Job & { qualified: boolean })[] {
  return jobs.map((j) => ({ ...j, qualified: isQualified(j, skills) }));
}

export function getJobsBySkills(skills: Record<string, number>): Job[] {
  return jobs.filter((job) => isQualified(job, skills));
}
