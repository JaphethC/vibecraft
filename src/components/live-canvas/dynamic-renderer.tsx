"use client";

import { useState, useCallback, useMemo } from "react";
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

  // Preserve form values when schema changes
  // This runs during render but only updates state when schema actually changed
  if (schema && schema.length > 0 && previousSchema) {
    const schemaChanged = JSON.stringify(schema) !== JSON.stringify(previousSchema);
    
    if (schemaChanged && schema.length !== previousSchema.length) {
      // Schema structure changed - preserve values for fields that still exist
      const preservedValues: Record<string, string> = {};
      schema.forEach((block, index) => {
        const path = `${index}`;
        if (formValues[path] !== undefined) {
          preservedValues[path] = formValues[path];
        }
      });
      // Update state with preserved values and update previous schema
      setFormValues(preservedValues);
      setPreviousSchema(schema);
    } else if (schemaChanged) {
      // Schema content changed but not length - just update reference
      setPreviousSchema(schema);
    }
  } else if (schema && schema.length > 0 && !previousSchema) {
    // First render with schema - just store it
    setPreviousSchema(schema);
  }

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
  const handleButtonClick = useCallback((buttonLabel: string) => {
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
      // Access optional properties safely using type guards
      const blockContent = 'content' in block ? block.content : undefined;
      const blockLabel = 'label' in block ? block.label : undefined;
      const stableKey = `${block.type}-${blockLabel || blockContent || ''}-${index}`;
      
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
