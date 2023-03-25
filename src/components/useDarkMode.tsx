import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const readDark = (e: MediaQueryListEvent) => {
      console.log("[App] dark mode", e.matches);
      setDark(e.matches);
    };

    prefersDark.addEventListener("change", readDark);

    return function cleanup() {
      prefersDark.removeEventListener("change", readDark);
    };
  }, []);

  return dark;
}
