"use client";

import { useState } from "react";

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    type: "error" | "success" | "info" | "warning";
    message: string;
  }>;
  onRemove: (id: string) => void;
}

const typeStyles = {
  error: "bg-error-container text-on-error-container",
  success: "bg-primary-container text-on-primary-container",
  info: "bg-tertiary-container text-on-tertiary-container",
  warning: "bg-secondary-container text-on-secondary-container",
};

const icons = {
  error: "error_outline",
  success: "check_circle",
  info: "info",
  warning: "warning",
};

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-md p-4 rounded-xl shadow-lg flex items-start gap-3 ${typeStyles[toast.type]} spring-motion`}
          role="alert"
        >
          <span className="material-symbols-outlined flex-shrink-0">
            {icons[toast.type]}
          </span>
          <div className="flex-1">
            <p className="body-md">{toast.message}</p>
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            className="p-1 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ))}
    </div>
  );
}

/**
 * Toast manager hook for displaying toasts
 */
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    type: "error" | "success" | "info" | "warning";
    message: string;
  }>>([]);

  const addToast = (message: string, type: "error" | "success" | "info" | "warning" = "info") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showError = (message?: string) => {
    addToast(
      message || "Oops, I lost my train of thought. Could you try saying that again?",
      "error"
    );
  };

  const showSuccess = (message: string) => {
    addToast(message, "success");
  };

  const showInfo = (message: string) => {
    addToast(message, "info");
  };

  return {
    toasts,
    addToast,
    removeToast,
    showError,
    showSuccess,
    showInfo,
  };
}
