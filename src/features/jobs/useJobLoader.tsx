import { useEffect, useState } from "react";
import { Job } from "../../app/models";
import { useAppSelector } from "../../app/store";
import { getJobById, isQualified } from "../../data/jobs";

export default function useJobLoader(id: string) {
  const [item, setItem] = useState<Job | null>(null);
  const skills = useAppSelector((state) => state.skills);

  useEffect(() => {
    if (!id) {
      return;
    }
    const found = getJobById(id);
    const qualified = isQualified(found, skills);
    setItem(found);
  }, [id, skills]);

  return item;
}
