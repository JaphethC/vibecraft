"use client";

import type { ButtonBlock } from "@/lib/schemas/ui-schema";
import { Button } from "@/components/ui/button";

interface ButtonBlockRendererProps {
  block: ButtonBlock;
  onClick: (label: string) => void;
  isLoading?: boolean;
}

/**
 * Button Block Renderer
 * Displays an action button
 * Submits the parent form when clicked
 */
export function ButtonBlockRenderer({ 
  block, 
  onClick,
  isLoading = false
}: ButtonBlockRendererProps) {
  return (
    <Button 
      type="submit"
      size="lg" 
      className="w-full h-11"
      onClick={() => onClick(block.label)}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : block.label}
    </Button>
  );
}
