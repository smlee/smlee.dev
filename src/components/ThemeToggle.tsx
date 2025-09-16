"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (light) {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
  }, [light]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setLight((v) => !v)}
      className="glass rounded-lg px-3 py-2 text-sm hover:opacity-90"
    >
      {light ? "Light" : "Dark"}
    </button>
  );
}
