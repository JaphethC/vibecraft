"use client";

import type { TitleBlock } from "@/lib/schemas/ui-schema";

/**
 * Title Block Renderer
 * Displays a section heading
 */
export function TitleBlockRenderer({ block }: { block: TitleBlock }) {
  return (
    <h2 className="text-2xl font-semibold tracking-tight text-foreground">
      {block.content}
    </h2>
  );
}
