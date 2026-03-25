"use client";

import type { InputBlock } from "@/lib/schemas/ui-schema";
import { Input } from "@/components/ui/input";

interface InputBlockRendererProps {
  block: InputBlock;
  path: string;
  value?: string;
  onValueChange?: (path: string, value: string) => void;
}

/**
 * Input Block Renderer
 * Displays a labeled text/number input field
 * Uses controlled component pattern for form value tracking
 */
export function InputBlockRenderer({ 
  block, 
  path,
  value,
  onValueChange 
}: InputBlockRendererProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {block.label}
      </label>
      <Input
        value={value}
        onChange={(e) => onValueChange?.(path, e.target.value)}
        placeholder={block.placeholder}
        className="h-11"
      />
    </div>
  );
}
