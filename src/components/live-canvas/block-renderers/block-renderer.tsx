"use client";

import type { UIBlock } from "@/lib/schemas/ui-schema";
import { TitleBlockRenderer } from "./title-block";
import { TextBlockRenderer } from "./text-block";
import { InputBlockRenderer } from "./input-block";
import { DropdownBlockRenderer } from "./dropdown-block";
import { ButtonBlockRenderer } from "./button-block";
import { CardBlockRenderer } from "./card-block";

interface BlockRendererProps {
  block: UIBlock;
  index: number;
  path?: string;
  onValueChange?: (path: string, value: string) => void;
  onButtonClick?: (label: string, path: string) => void;
  isLoading?: boolean;
  formValues?: Record<string, string>;
}

/**
 * Block Renderer - Maps block types to their corresponding components
 * Passes handlers through to interactive blocks
 */
export function BlockRenderer({
  block,
  index,
  path = `${index}`,
  onValueChange,
  onButtonClick,
  isLoading = false,
  formValues,
}: BlockRendererProps) {
  switch (block.type) {
    case "title":
      return <TitleBlockRenderer key={index} block={block} />;
    case "text":
      return <TextBlockRenderer key={index} block={block} />;
    case "input":
      return (
        <InputBlockRenderer
          key={index}
          block={block}
          path={path}
          onValueChange={onValueChange}
          value={formValues?.[path]}
        />
      );
    case "dropdown":
      return (
        <DropdownBlockRenderer
          key={index}
          block={block}
          path={path}
          onValueChange={onValueChange}
          value={formValues?.[path]}
        />
      );
    case "button":
      return (
        <ButtonBlockRenderer 
          key={index} 
          block={block} 
          onClick={(label) => onButtonClick?.(label, path)}
          isLoading={isLoading}
        />
      );
    case "card":
      return (
        <CardBlockRenderer
          key={index}
          block={block}
          path={path}
          onValueChange={onValueChange}
          onButtonClick={onButtonClick}
          isLoading={isLoading}
          formValues={formValues}
        />
      );
    default:
      // Fallback for unknown block types
      return (
        <div key={index} className="text-muted-foreground text-sm">
          [Unsupported block: {(block as { type: string }).type}]
        </div>
      );
  }
}
