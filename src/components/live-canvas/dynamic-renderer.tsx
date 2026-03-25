"use client";

import { useMemo } from "react";
import type { UIBlock } from "@/lib/schemas/ui-schema";
import { BlockRenderer } from "./block-renderers/block-renderer";
import { Card, CardContent } from "@/components/ui/card";

interface DynamicRendererProps {
  schema: UIBlock[];
}

/**
 * Dynamic Renderer - Maps UI schema blocks to rendered React components
 * Wraps everything in a polished card container for a tablet-like appearance
 */
export function DynamicRenderer({ schema }: DynamicRendererProps) {
  const renderedBlocks = useMemo(() => {
    if (!schema || schema.length === 0) {
      return null;
    }

    return schema.map((block, index) => (
      <BlockRenderer key={`${block.type}-${index}`} block={block} index={index} />
    ));
  }, [schema]);

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg border-0 rounded-xl">
      <CardContent className="p-6 space-y-6">
        {renderedBlocks}
      </CardContent>
    </Card>
  );
}
