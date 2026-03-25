"use client";

import type { InputBlock } from "@/lib/schemas/ui-schema";
import { Input } from "@/components/ui/input";

/**
 * Input Block Renderer
 * Displays a labeled text/number input field
 */
export function InputBlockRenderer({ block }: { block: InputBlock }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {block.label}
      </label>
      <Input
        placeholder={block.placeholder}
        className="h-11"
      />
    </div>
  );
}
