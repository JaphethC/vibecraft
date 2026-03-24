# Design System Strategy: The Tactile Companion

## 1. Overview & Creative North Star
The core philosophy of this design system is **"The Tactile Companion."** For a non-technical, blue-collar audience, digital interfaces can often feel fragile or overly complex. This system rejects the "fragility" of modern tech in favor of a sturdy, dependable, and approachable environment. 

We break the "standard template" look by utilizing **intentional asymmetry** and **tonal depth**. Instead of rigid, boxed-in grids, we use expansive white space and "soft-touch" surfaces. The interface should feel like a well-organized physical workspace: clear, heavy-duty where it needs to be, and instinctively easy to navigate.

**Creative Principles:**
*   **Sturdy but Soft:** Large radius corners (`xl`: 3rem) remove the "sharpness" of tech.
*   **Physicality:** Using background shifts instead of lines to create a sense of "carved" or "stacked" space.
*   **The Editorial Breath:** We use high-contrast typography scales (`display-lg` vs `body-md`) to create a clear path for the eye, ensuring the most important information is unmissable.

---

## 2. Colors & Surface Philosophy
The palette is rooted in a dependable `primary` Indigo (#376289), balanced by a high-clarity `surface` (#f7f9fb).

*   **The "No-Line" Rule:** To achieve a premium, custom feel, **1px solid borders are prohibited** for sectioning. Definition must come from color transitions. For example, a `surface-container-low` header should sit directly against a `surface` body. This creates a seamless, modern aesthetic that feels "built" rather than "drawn."
*   **Surface Hierarchy & Nesting:** Treat the UI as layers of fine cardstock. 
    *   **Background:** `surface` (#f7f9fb)
    *   **Secondary Content:** `surface-container` (#eaeff2)
    *   **Elevated Interaction:** `surface-container-lowest` (#ffffff)
*   **The "Glass & Gradient" Rule:** To avoid a "flat" or "cheap" appearance, main CTAs should utilize a subtle linear gradient from `primary` (#376289) to `primary_dim` (#29567c). For floating navigation or overlays, use a `surface_container_lowest` with 80% opacity and a `backdrop-blur` of 12px to create a "frosted glass" effect.

---

## 3. Typography
We pair **Plus Jakarta Sans** for headers with **Inter** for utility. This creates an "Editorial-meets-Functional" vibe.

*   **Display & Headlines (Plus Jakarta Sans):** Used to guide the user. The `display-lg` (3.5rem) is reserved for welcome states and major milestones, creating a friendly, confident tone.
*   **Titles & Body (Inter):** High x-heights ensure readability for workers on the move or in low-light environments. 
*   **Tonal Authority:** We never use "technical jargon." Titles are conversational (e.g., "Where are you working today?" instead of "Location Select").

---

## 4. Elevation & Depth
We reject traditional "drop shadows" in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A card using `surface-container-lowest` (pure white) placed on a `surface` (pale blue-grey) background provides an organic lift that feels intentional and clean.
*   **Ambient Shadows:** If an element must float (like a FAB or a Modal), use a tinted shadow: `0 20px 40px rgba(55, 98, 137, 0.08)`. This uses the `primary` color to create a natural, ambient glow rather than a muddy grey shadow.
*   **The "Ghost Border" Fallback:** If a boundary is required for accessibility, use `outline-variant` (#acb3b7) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons & Touch Targets
*   **Primary:** Height `12` (4rem) to ensure "fat-finger" friendliness. Use `primary` background with `on-primary` text. Shape: `xl` (3rem) pill.
*   **Secondary:** `secondary-container` background. No border.
*   **Haptic Feedback:** All interactive states should feel "pressable." On `:active`, use a `scale(0.98)` transform to simulate physical resistance.

### Cards & Lists
*   **No Dividers:** Forbid the use of horizontal rules. Separate list items using `spacing-3` (1rem) gaps or by alternating backgrounds between `surface` and `surface-container-low`.
*   **Card Styling:** Use `md` (1.5rem) or `lg` (2rem) padding to give content room to breathe.

### Input Fields
*   **Structure:** Large-scale fields (h-16) with `xl` corners.
*   **Labels:** Use `label-md` in `on-surface-variant` positioned *above* the field, never inside as placeholder text. This ensures the user never loses context.

### The "Status Block" (Custom Component)
Instead of small status dots, use large, soft-colored blocks (e.g., `tertiary-container`) with `headline-sm` text to communicate job status (e.g., "Active," "Done"). It makes the UI feel authoritative and easy to read at a distance.

---

## 6. Do's and Don'ts

### Do:
*   **Use Massive Spacing:** When in doubt, increase the gap. Use `spacing-10` (3.5rem) between major sections.
*   **Color Transitions:** Use `surface-container-high` to highlight an active area within a `surface-container` parent.
*   **Conversational Microcopy:** Use "Got it" instead of "Dismiss" or "OK."

### Don't:
*   **Don't use 1px lines:** They create visual "noise" and make the app look like a spreadsheet.
*   **Don't use pure black:** Use `on-surface` (#2c3437) for text to maintain a soft, premium feel.
*   **Don't cram content:** If a screen feels full, split it into a step-by-step flow. This audience prefers "one clear task per screen."

---

## 7. Accessibility & Motion
*   **Contrast:** Ensure all text on `primary-container` meets AA standards by using `on-primary-container` (#0d4166).
*   **Motion:** Use "Spring" physics for transitions (Damping: 20, Stiffness: 90). Elements should "bounce" into place slightly, reinforcing the friendly, non-intimidating nature of the system.