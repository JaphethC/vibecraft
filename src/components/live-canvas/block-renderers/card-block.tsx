"use client";

import type { CardBlock, UIBlock } from "@/lib/schemas/ui-schema";
import { Card, CardContent } from "@/components/ui/card";
import { BlockRenderer } from "./block-renderer";

/**
 * Card Block Renderer
 * Displays a container with nested child blocks
 * Recursively renders children
 */
export function CardBlockRenderer({ block }: { block: CardBlock }) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {block.children.length > 0 ? (
          block.children.map((child, index) => (
            <BlockRenderer key={`card-${child.type}-${index}`} block={child} index={index} />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">Empty card</p>
        )}
      </CardContent>
    </Card>
  );
}
