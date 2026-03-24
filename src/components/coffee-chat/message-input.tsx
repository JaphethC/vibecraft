"use client";

import { PLACEHOLDERS, BUTTONS } from "@/lib/copy/plain-language";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

/**
 * Message Input - Handles text input, microphone button, and submit action
 * Properly handles disabled state while AI is thinking
 */
export function MessageInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  placeholder,
}: MessageInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-6 bg-surface-container-low">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
        {/* Text Input */}
        <div className="flex-1 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 overflow-hidden focus-within:ring-2 ring-primary/20 transition-all">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="w-full h-14 px-6 bg-transparent border-none focus:ring-0 text-on-surface disabled:opacity-50"
            placeholder={placeholder || PLACEHOLDERS.chatInput[0]}
            type="text"
            aria-label="Message input"
          />
        </div>

        {/* Microphone Button (Future feature - visual placeholder for MVP) */}
        <button
          type="button"
          disabled={isLoading}
          className="w-14 h-14 rounded-full bg-surface-container-highest text-primary flex items-center justify-center hover:bg-primary-container transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-surface-container-highest"
          aria-label="Voice input (coming soon)"
          title="Voice input (coming soon)"
        >
          <span className="material-symbols-outlined">mic</span>
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="h-14 px-6 rounded-xl bg-primary text-on-primary font-bold flex items-center gap-2 hover:bg-primary-dim transition-all active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
          aria-label="Send message"
        >
          <span>{BUTTONS.send}</span>
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  );
}
