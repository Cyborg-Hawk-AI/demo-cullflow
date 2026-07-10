"use client";

import { Info } from "lucide-react";
import { useState } from "react";

interface DevNoteProps {
  note: string;
  position?: "top" | "bottom";
}

export function DevNote({ note, position = "top" }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
        aria-label="Developer note"
      >
        <Info className="h-3 w-3" />
      </button>
      {open && (
        <span
          className={`absolute z-50 w-64 rounded-lg border border-amber-500/30 bg-surface-700 p-3 text-xs leading-relaxed text-gray-300 shadow-xl animate-fade-in ${
            position === "top"
              ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
              : "top-full left-1/2 -translate-x-1/2 mt-2"
          }`}
        >
          <span className="mb-1 block font-semibold text-amber-400">DEV NOTE</span>
          {note}
        </span>
      )}
    </span>
  );
}
