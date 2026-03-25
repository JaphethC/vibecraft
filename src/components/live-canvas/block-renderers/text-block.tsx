"use client";

import type { TextBlock } from "@/lib/schemas/ui-schema";

/**
 * Text Block Renderer
 * Displays descriptive paragraph text
 */
export function TextBlockRenderer({ block }: { block: TextBlock }) {
  return (
    <p className="text-muted-foreground leading-relaxed">
      {block.content}
    </p>
  );
}
