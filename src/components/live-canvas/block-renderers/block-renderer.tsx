"use client";

import type { UIBlock } from "@/lib/schemas/ui-schema";
import { TitleBlockRenderer } from "./title-block";
import { TextBlockRenderer } from "./text-block";
import { InputBlockRenderer } from "./input-block";
import { DropdownBlockRenderer } from "./dropdown-block";
import { ButtonBlockRenderer } from "./button-block";
import { CardBlockRenderer } from "./card-block";

/**
 * Block Renderer - Maps block types to their corresponding components
 */
export function BlockRenderer({ block, index }: { block: UIBlock; index: number }) {
  switch (block.type) {
    case "title":
      return <TitleBlockRenderer key={index} block={block} />;
    case "text":
      return <TextBlockRenderer key={index} block={block} />;
    case "input":
      return <InputBlockRenderer key={index} block={block} />;
    case "dropdown":
      return <DropdownBlockRenderer key={index} block={block} />;
    case "button":
      return <ButtonBlockRenderer key={index} block={block} />;
    case "card":
      return <CardBlockRenderer key={index} block={block} />;
    default:
      // Fallback for unknown block types (shouldn't happen after normalization)
      return (
        <div key={index} className="text-muted-foreground text-sm">
          [Unsupported block: {(block as { type: string }).type}]
        </div>
      );
  }
}
