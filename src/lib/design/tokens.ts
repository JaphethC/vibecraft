/**
 * VibeCraft Design Tokens
 * The Tactile Companion - Design System
 *
 * A sturdy, dependable, and approachable design system for non-technical
 * industry experts. These tokens mirror the CSS custom properties in
 * globals.css for use in TypeScript/React components.
 */

// =============================================================================
// Color Palette - Surface Philosophy
// =============================================================================

export const colors = {
  // Primary - Dependable Indigo
  primary: "#376289",
  primaryDim: "#29567c",
  primaryFixed: "#9dc8f4",
  primaryFixedDim: "#90bae5",
  onPrimary: "#f7f9ff",
  onPrimaryFixed: "#002c4a",
  onPrimaryFixedVariant: "#1b4a70",
  onPrimaryContainer: "#0d4166",
  primaryContainer: "#9dc8f4",

  // Secondary - Supportive Blue-Grey
  secondary: "#51616e",
  secondaryDim: "#455562",
  secondaryFixed: "#d4e5f4",
  secondaryFixedDim: "#c6d7e6",
  onSecondary: "#f5f9ff",
  onSecondaryFixed: "#31414d",
  onSecondaryFixedVariant: "#4d5d6a",
  onSecondaryContainer: "#445460",
  secondaryContainer: "#d4e5f4",

  // Tertiary - Accent Purple
  tertiary: "#5d5a84",
  tertiaryDim: "#514f78",
  tertiaryFixed: "#d1ccfd",
  tertiaryFixedDim: "#c3bfef",
  onTertiary: "#fcf7ff",
  onTertiaryFixed: "#323057",
  onTertiaryFixedVariant: "#4f4c75",
  onTertiaryContainer: "#46436b",
  tertiaryContainer: "#d1ccfd",

  // Surface Hierarchy - Layers of Fine Cardstock
  surface: "#f7f9fb",
  surfaceBright: "#f7f9fb",
  surfaceDim: "#d4dbdf",
  surfaceContainer: "#eaeff2",
  surfaceContainerLow: "#f0f4f7",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerHigh: "#e3e9ed",
  surfaceContainerHighest: "#dce4e8",
  surfaceVariant: "#dce4e8",
  surfaceTint: "#376289",

  // On Surface - Text Colors
  onSurface: "#2c3437",
  onSurfaceVariant: "#596064",
  inverseSurface: "#0b0f10",
  inverseOnSurface: "#9a9d9f",

  // Outline & Borders - Ghost Border Fallback
  outline: "#747c80",
  outlineVariant: "#acb3b7",

  // Error States
  error: "#a83836",
  errorDim: "#67040d",
  errorContainer: "#fa746f",
  onError: "#fff7f6",
  onErrorContainer: "#6e0a12",

  // Background & Foreground
  background: "#f7f9fb",
  onBackground: "#2c3437",
} as const;

// =============================================================================
// Typography - Editorial meets Functional
// =============================================================================

export const fonts = {
  headline: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  body: '"Inter", ui-sans-serif, system-ui, sans-serif',
  label: '"Inter", ui-sans-serif, system-ui, sans-serif',
} as const;

export const fontSizes = {
  displayLg: "3.5rem",
  headlineLg: "2rem",
  headlineMd: "1.25rem",
  bodyLg: "1.125rem",
  bodyMd: "1rem",
  bodySm: "0.875rem",
  labelMd: "0.875rem",
  labelSm: "0.75rem",
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const lineHeights = {
  tight: 1.1,
  normal: 1.25,
  relaxed: 1.5,
  loose: 1.625,
} as const;

export const letterSpacings = {
  tight: "-0.02em",
  normal: "0",
  wide: "0.01em",
  wider: "0.08em",
} as const;

// =============================================================================
// Border Radius - Sturdy but Soft
// =============================================================================

export const borderRadius = {
  default: "1rem",
  lg: "2rem",
  xl: "3rem",
  full: "9999px",
} as const;

// =============================================================================
// Spacing - Massive Spacing for Breathing Room
// =============================================================================

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "2.5rem",
  "3xl": "3rem",
  section: "3.5rem", // Massive spacing between major sections
} as const;

// =============================================================================
// Shadows - Ambient Tinted Shadows
// =============================================================================

export const shadows = {
  ambient: "0 20px 40px rgba(55, 98, 137, 0.08)",
  primary: "0 4px 12px rgba(55, 98, 137, 0.2)",
  primaryHover: "0 6px 16px rgba(55, 98, 137, 0.25)",
  ghost: "0 2px 8px rgba(55, 98, 137, 0.04)",
} as const;

// =============================================================================
// Transitions - Spring Motion & Haptic Feedback
// =============================================================================

export const transitions = {
  // Spring physics for friendly bounce
  spring: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  // Haptic press interaction
  haptic: "transform 0.1s ease",
  // Standard ease transitions
  ease: "all 0.2s ease",
} as const;

export const transforms = {
  press: "scale(0.98)",
} as const;

// =============================================================================
// Component Tokens
// =============================================================================

export const button = {
  primary: {
    height: "4rem",
    borderRadius: borderRadius.xl,
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDim} 100%)`,
    color: colors.onPrimary,
    boxShadow: shadows.primary,
  },
  secondary: {
    height: "3rem",
    borderRadius: borderRadius.xl,
    background: colors.secondaryContainer,
    color: colors.onSecondaryContainer,
  },
} as const;

export const input = {
  field: {
    height: "4rem",
    borderRadius: borderRadius.xl,
    background: colors.surfaceContainer,
    color: colors.onSurface,
  },
  label: {
    color: colors.onSurfaceVariant,
    position: "above", // Never placeholder
  },
} as const;

export const card = {
  md: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    background: colors.surfaceContainerLowest,
    boxShadow: shadows.ambient,
  },
  lg: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    background: colors.surfaceContainerLowest,
    boxShadow: shadows.ambient,
  },
} as const;

// =============================================================================
// Design Principles
// =============================================================================

export const principles = {
  // The "No-Line" Rule - no 1px solid borders for sectioning
  noLineRule: true,

  // Ghost Border Fallback - 15% opacity if boundary required
  ghostBorderOpacity: 0.15,

  // Glass & Gradient Rule
  glassOpacity: 0.8,
  backdropBlur: "12px",

  // Fat-Finger Friendly minimum touch target
  minTouchTarget: "4rem",

  // One clear task per screen
  oneTaskPerScreen: true,

  // Conversational microcopy
  conversationalCopy: true,
} as const;

// =============================================================================
// Type Exports
// =============================================================================

export type ColorKey = keyof typeof colors;
export type FontKey = keyof typeof fonts;
export type BorderRadiusKey = keyof typeof borderRadius;
export type SpacingKey = keyof typeof spacing;
export type ShadowKey = keyof typeof shadows;
