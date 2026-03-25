"use client";

import type { ButtonBlock } from "@/lib/schemas/ui-schema";
import { Button } from "@/components/ui/button";

/**
 * Button Block Renderer
 * Displays an action button
 */
export function ButtonBlockRenderer({ block }: { block: ButtonBlock }) {
  return (
    <Button size="lg" className="w-full h-11">
      {block.label}
    </Button>
  );
}
