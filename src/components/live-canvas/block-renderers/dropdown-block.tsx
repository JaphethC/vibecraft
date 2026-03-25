"use client";

import type { DropdownBlock } from "@/lib/schemas/ui-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownBlockRendererProps {
  block: DropdownBlock;
  path: string;
  value?: string;
  onValueChange?: (path: string, value: string) => void;
}

/**
 * Dropdown Block Renderer
 * Displays a labeled select dropdown using shadcn/ui Select
 * Uses controlled component pattern for form value tracking
 */
export function DropdownBlockRenderer({ 
  block, 
  path,
  value,
  onValueChange 
}: DropdownBlockRendererProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none">
        {block.label}
      </label>
      <Select 
        value={value || ""}
        onValueChange={(val) => {
          if (val) onValueChange?.(path, val);
        }}
      >
        <SelectTrigger className="h-11 w-full bg-white">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent className="bg-white z-50 shadow-md border border-gray-200 p-1">
          {block.options.map((option, index) => (
            <SelectItem
              key={index}
              value={option.toLowerCase().replace(/\s+/g, "-")}
              className="px-3 py-2"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
