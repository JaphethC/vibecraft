"use client";

import { useState, useEffect, useCallback } from "react";

export type ToastType = "error" | "success" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ErrorToastProps {
  message?: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

/**
 * Friendly error toast component for API failures
 * Shows a non-technical, friendly error message
 */
export function ErrorToast({
  message = "Oops, I lost my train of thought. Could you try saying that again?",
  type = "error",
  duration = 5000,
  onClose,
}: ErrorToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

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
      className={`fixed bottom-4 right-4 max-w-md p-4 rounded-xl shadow-lg flex items-start gap-3 ${typeStyles[type]} spring-motion`}
      role="alert"
    >
      <span className="material-symbols-outlined flex-shrink-0">
        {icons[type]}
      </span>
      <div className="flex-1">
        <p className="body-md">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="p-1 hover:bg-black/10 rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
}

/**
 * Toast manager for displaying multiple toasts
 */
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, [removeToast]);

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

/**
 * Friendly error messages for common API failures
 */
export const FRIENDLY_ERROR_MESSAGES = {
  network: "Oops, I lost my connection. Could you try that again?",
  timeout: "I'm taking a bit longer than expected. Hang tight!",
  parse: "Hmm, I got confused there. Could you rephrase that?",
  auth: "I'm having trouble connecting. Please try again in a moment!",
  rateLimit: "I'm getting a bit overwhelmed! Let me catch my breath and try again.",
  default: "Oops, something went wrong. Let's try that again!",
};
