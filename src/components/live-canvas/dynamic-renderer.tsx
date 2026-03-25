"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type { UIBlock } from "@/lib/schemas/ui-schema";
import { BlockRenderer } from "./block-renderers/block-renderer";
import { Card, CardContent } from "@/components/ui/card";

interface DynamicRendererProps {
  schema: UIBlock[];
  onSubmit?: (formData: { values: Record<string, string>; buttonLabel: string }) => void;
  isLoading?: boolean;
}

/**
 * Dynamic Renderer - Maps UI schema blocks to rendered React components
 * Wraps everything in a polished card container for a tablet-like appearance
 * Manages form state and handles button submissions
 * 
 * STABILITY FEATURES:
 * - Preserves form values across schema updates (smart merging)
 * - Uses stable keys to prevent unnecessary re-renders
 * - Handles partial/invalid schemas gracefully
 * - Prevents re-render loops with useMemo
 */
export function DynamicRenderer({
  schema,
  onSubmit,
  isLoading = false
}: DynamicRendererProps) {
  // Track form values in state - preserved across schema updates
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  
  // Track previous schema to detect meaningful changes
  const [previousSchema, setPreviousSchema] = useState<UIBlock[] | null>(null);

  // Update form values when schema changes (preserve existing values, add new fields)
  useEffect(() => {
    if (!schema || schema.length === 0) {
      return;
    }

    // Check if schema actually changed (not just a re-render)
    const schemaChanged = JSON.stringify(schema) !== JSON.stringify(previousSchema);
    
    if (schemaChanged) {
      // Preserve existing form values - don't clear them on schema updates
      // Only clear if the schema is completely different (different number of blocks)
      if (previousSchema && schema.length !== previousSchema.length) {
        // Schema structure changed significantly - keep values that still apply
        setFormValues(prev => {
          // Keep values for fields that still exist in new schema
          const preservedValues: Record<string, string> = {};
          schema.forEach((block, index) => {
            const path = `${index}`;
            if (prev[path] !== undefined) {
              preservedValues[path] = prev[path];
            }
          });
          return preservedValues;
        });
      }
      // Update previous schema reference
      setPreviousSchema(schema);
    }
  }, [schema, previousSchema]);

  // Update a form value
  const handleValueChange = useCallback((path: string, value: string) => {
    setFormValues(prev => ({ ...prev, [path]: value }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;

    onSubmit({ values: formValues, buttonLabel: "Submit" });
  }, [formValues, onSubmit]);

  // Handle button click (for individual buttons within the form)
  const handleButtonClick = useCallback((buttonLabel: string, buttonPath: string) => {
    if (isLoading || !onSubmit) return;

    onSubmit({ values: formValues, buttonLabel });
  }, [formValues, onSubmit, isLoading]);

  // Memoize rendered blocks to prevent unnecessary re-renders
  const renderedBlocks = useMemo(() => {
    if (!schema || schema.length === 0) {
      return null;
    }

    return schema.map((block, index) => {
      // Use stable key based on block type and content, not just index
      // Cast to any to access optional properties safely
      const blockAny = block as any;
      const stableKey = `${block.type}-${blockAny.label || blockAny.content || ''}-${index}`;
      
      return (
        <BlockRenderer
          key={stableKey}
          block={block}
          index={index}
          path={`${index}`}
          onValueChange={handleValueChange}
          onButtonClick={handleButtonClick}
          isLoading={isLoading}
          formValues={formValues}
        />
      );
    });
  }, [schema, handleValueChange, handleButtonClick, isLoading, formValues]);

  // Show empty state if no schema
  if (!schema || schema.length === 0) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-md mx-auto bg-white shadow-lg border-0 rounded-xl mt-8">
        <CardContent className="p-6 space-y-6">
          {renderedBlocks}
        </CardContent>
      </Card>
    </form>
  );
}
