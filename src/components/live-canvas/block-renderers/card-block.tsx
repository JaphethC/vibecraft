"use client";

import type { CardBlock } from "@/lib/schemas/ui-schema";
import { Card, CardContent } from "@/components/ui/card";
import { BlockRenderer } from "./block-renderer";

interface CardBlockRendererProps {
  block: CardBlock;
  path: string;
  onValueChange?: (path: string, value: string) => void;
  onButtonClick?: (label: string, path: string) => void;
  isLoading?: boolean;
  formValues?: Record<string, string>;
}

/**
 * Card Block Renderer
 * Displays a container with nested child blocks
 * Recursively renders children with updated paths
 */
export function CardBlockRenderer({
  block,
  path,
  onValueChange,
  onButtonClick,
  isLoading = false,
  formValues,
}: CardBlockRendererProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {block.children.length > 0 ? (
          block.children.map((child, childIndex) => (
            <BlockRenderer
              key={`card-${child.type}-${childIndex}`}
              block={child}
              index={childIndex}
              path={`${path}-card-${childIndex}`}
              onValueChange={onValueChange}
              onButtonClick={onButtonClick}
              isLoading={isLoading}
              formValues={formValues}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">Empty card</p>
        )}
      </CardContent>
    </Card>
  );
}
