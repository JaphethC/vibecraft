"use client";

import { useState, useCallback } from "react";
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
 */
export function DynamicRenderer({ 
  schema, 
  onSubmit,
  isLoading = false 
}: DynamicRendererProps) {
  // Track form values in state
  const [formValues, setFormValues] = useState<Record<string, string>>({});

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

  const renderedBlocks = schema.map((block, index) => (
    <BlockRenderer
      key={`${block.type}-${index}`}
      block={block}
      index={index}
      path={`${index}`}
      onValueChange={handleValueChange}
      onButtonClick={handleButtonClick}
      isLoading={isLoading}
      formValues={formValues}
    />
  ));

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
