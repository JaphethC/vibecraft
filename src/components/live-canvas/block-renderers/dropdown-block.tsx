"use client";

import type { DropdownBlock } from "@/lib/schemas/ui-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Dropdown Block Renderer
 * Displays a labeled select dropdown
 */
export function DropdownBlockRenderer({ block }: { block: DropdownBlock }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none">
        {block.label}
      </label>
      <Select>
        <SelectTrigger className="h-11">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {block.options.map((option, index) => (
            <SelectItem 
              key={index} 
              value={option.toLowerCase().replace(/\s+/g, "-")}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
