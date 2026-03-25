"use client";

import { useMemo } from "react";
import type { UIBlock } from "@/lib/schemas/ui-schema";
import { BlockRenderer } from "./block-renderers/block-renderer";

interface DynamicRendererProps {
  schema: UIBlock[];
}

/**
 * Dynamic Renderer - Maps UI schema blocks to rendered React components
 * Uses memoization to prevent unnecessary re-renders
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
    <div className="w-full max-w-2xl space-y-6 p-8">
      {renderedBlocks}
    </div>
  );
}
