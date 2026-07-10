"use client";

import { useCallback, useState } from "react";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "info" | "warning";
}

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: Toast["type"] = "success") => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => onDismiss(toast.id)}
          className={`animate-slide-up rounded-lg border px-4 py-3 text-sm font-medium shadow-xl text-left max-w-sm ${
            toast.type === "success"
              ? "border-brand-500/40 bg-brand-900/90 text-brand-100"
              : toast.type === "warning"
                ? "border-amber-500/40 bg-amber-900/90 text-amber-100"
                : "border-blue-500/40 bg-blue-900/90 text-blue-100"
          }`}
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}
