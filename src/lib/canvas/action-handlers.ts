import type { UIBlock } from "@/lib/schemas/ui-schema";

/**
 * Form values collected from the canvas
 * Key is the field path, value is the user's input
 */
export type FormValues = Record<string, string>;

/**
 * Result of handling a form action
 */
export interface ActionResult {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

/**
 * Collect form values from the rendered canvas
 * Traverses the schema and extracts user input for input/dropdown blocks
 */
export function collectFormValues(
  schema: UIBlock[],
  elementRefs: Record<string, HTMLInputElement | HTMLSelectElement | null>
): FormValues {
  const values: FormValues = {};

  function extractValues(blocks: UIBlock[], path: string = "") {
    blocks.forEach((block, index) => {
      const currentPath = path ? `${path}.${index}` : `${index}`;

      if (block.type === "input" || block.type === "dropdown") {
        const ref = elementRefs[currentPath];
        if (ref && "value" in ref) {
          values[currentPath] = String(ref.value || "");
        }
      } else if (block.type === "card" && block.children.length > 0) {
        extractValues(block.children, currentPath);
      }
    });
  }

  extractValues(schema);
  return values;
}

/**
 * Handle a button click action
 * Returns an action result that can be sent to the API
 */
export async function handleButtonClick(params: {
  buttonLabel: string;
  formValues: FormValues;
  schema: UIBlock[];
}): Promise<ActionResult> {
  const { buttonLabel, formValues, schema } = params;

  try {
    // For MVP, we just collect the values and send them back
    // In the future, this could trigger specific actions based on button label
    return {
      success: true,
      message: `Submitted: ${buttonLabel}`,
      data: {
        action: buttonLabel,
        values: formValues,
        timestamp: Date.now(),
      },
    };
  } catch (error) {
    console.error("Failed to handle button click:", error);
    return {
      success: false,
      message: "There was a problem submitting your information. Please try again.",
    };
  }
}

/**
 * Prepare form submission data for the /api/chat endpoint
 * Formats collected values into a user-friendly message
 */
export function prepareFormSubmission(params: {
  buttonLabel: string;
  formValues: FormValues;
  schema: UIBlock[];
}): string {
  const { buttonLabel, formValues, schema } = params;

  // Build a natural language summary of the form data
  const fieldDescriptions: string[] = [];

  function describeFields(blocks: UIBlock[], values: FormValues) {
    blocks.forEach((block, index) => {
      const path = `${index}`;
      const value = values[path];

      if (block.type === "input" && value) {
        fieldDescriptions.push(`${block.label}: ${value}`);
      } else if (block.type === "dropdown" && value) {
        fieldDescriptions.push(`${block.label}: ${value}`);
      } else if (block.type === "card" && block.children.length > 0) {
        describeFields(block.children, values);
      }
    });
  }

  describeFields(schema, formValues);

  if (fieldDescriptions.length === 0) {
    return `I clicked "${buttonLabel}" but didn't fill in any fields yet.`;
  }

  return `I clicked "${buttonLabel}" with the following information: ${fieldDescriptions.join(", ")}.`;
}

/**
 * Validate that required form fields are filled
 * Returns an array of missing field labels
 */
export function validateRequiredFields(
  schema: UIBlock[],
  formValues: FormValues,
  elementRefs: Record<string, HTMLInputElement | HTMLSelectElement | null>
): string[] {
  const missingFields: string[] = [];

  function checkRequired(blocks: UIBlock[], path: string = "") {
    blocks.forEach((block, index) => {
      const currentPath = path ? `${path}.${index}` : `${index}`;

      if (block.type === "input" || block.type === "dropdown") {
        const ref = elementRefs[currentPath];
        const value = ref?.value?.trim();
        
        // For MVP, all fields are considered required if they exist
        if (!value) {
          missingFields.push(block.label);
        }
      } else if (block.type === "card" && block.children.length > 0) {
        checkRequired(block.children, currentPath);
      }
    });
  }

  checkRequired(schema);
  return missingFields;
}

/**
 * Get a friendly message for missing required fields
 */
export function getMissingFieldsMessage(missingFields: string[]): string {
  if (missingFields.length === 0) {
    return "";
  }

  if (missingFields.length === 1) {
    return `Please fill in the ${missingFields[0]} field.`;
  }

  if (missingFields.length === 2) {
    return `Please fill in ${missingFields[0]} and ${missingFields[1]}.`;
  }

  const lastField = missingFields[missingFields.length - 1];
  const otherFields = missingFields.slice(0, -1);
  return `Please fill in ${otherFields.join(", ")}, and ${lastField}.`;
}
