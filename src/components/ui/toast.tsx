"use client";

import { createContext, useContext, useState, useCallback } from "react";

type ToastType = "error" | "success" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
  showError: (message?: string) => void;
  showSuccess: (message: string) => void;
  showInfo: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showError = useCallback((message?: string) => {
    addToast(
      message || "Oops, I lost my train of thought. Could you try saying that again?",
      "error"
    );
  }, [addToast]);

  const showSuccess = useCallback((message: string) => {
    addToast(message, "success");
  }, [addToast]);

  const showInfo = useCallback((message: string) => {
    addToast(message, "info");
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, showError, showSuccess, showInfo }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
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

  return (
    <div
      className={`max-w-md p-4 rounded-xl shadow-lg flex items-start gap-3 ${typeStyles[toast.type]} animate-in slide-in-from-right`}
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
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
