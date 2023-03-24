import { useEffect, useState } from "react";
import { Investment } from "../../app/models";
import { getInvestmentById } from "../../data/investments";

export default function useInvestment(id: string) {
  const [item, setItem] = useState<Investment | null>(null);

  // load data
  useEffect(() => {
    if (!id) {
      return;
    }

    const found = getInvestmentById(id);
    if (!found) {
      return;
    }

    setItem(found);
  }, [id]);

  return item;
}
