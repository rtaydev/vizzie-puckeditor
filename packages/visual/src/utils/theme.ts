import type { CSSProperties } from 'react';
import type { PuckTheme } from '../config/types';

export const applyTheme = (theme: PuckTheme): CSSProperties => {
	return {
		'--puck-color-primary': theme.colors.primary,
		'--puck-color-secondary': theme.colors.secondary,
		'--puck-color-background': theme.colors.background,
		'--puck-color-background-secondary': theme.colors.backgroundSecondary,
		'--puck-color-background-tertiary': theme.colors.backgroundTertiary,
		'--puck-color-text': theme.colors.text,
		'--puck-color-text-secondary': theme.colors.textSecondary,
		'--puck-color-text-tertiary': theme.colors.textTertiary,
		'--puck-color-border': theme.colors.border,
		'--puck-color-border-secondary': theme.colors.borderSecondary,
		'--puck-color-border-tertiary': theme.colors.borderTertiary,
		'--puck-color-button-primary': theme.colors.buttonPrimary,
		'--puck-color-button-primary-text': theme.colors.buttonPrimaryText,
		'--puck-color-button-secondary': theme.colors.buttonSecondary,
		'--puck-color-button-secondary-text': theme.colors.buttonSecondaryText,
		'--puck-color-input-background': theme.colors.inputBackground,
		'--puck-color-input-border': theme.colors.inputBorder,
		'--puck-color-input-text': theme.colors.inputText,
		'--puck-color-preview-background': theme.colors.previewBackground,
		'--puck-color-header-background': theme.colors.headerBackground,
		'--puck-color-header-border': theme.colors.headerBorder,
		'--puck-font-sans': theme.typography.fontSans,
		'--puck-font-mono': theme.typography.fontMono,
		'--puck-font-size-base': theme.typography.fontSizeBase,
		'--puck-font-size-small': theme.typography.fontSizeSmall,
		'--puck-font-size-large': theme.typography.fontSizeLarge,
		'--puck-font-weight-normal': theme.typography.fontWeightNormal,
		'--puck-font-weight-medium': theme.typography.fontWeightMedium,
		'--puck-font-weight-bold': theme.typography.fontWeightBold,
		'--puck-spacing-xs': theme.spacing.xs,
		'--puck-spacing-sm': theme.spacing.sm,
		'--puck-spacing-md': theme.spacing.md,
		'--puck-spacing-lg': theme.spacing.lg,
		'--puck-spacing-xl': theme.spacing.xl,
		'--puck-border-radius-sm': theme.borderRadius.sm,
		'--puck-border-radius-md': theme.borderRadius.md,
		'--puck-border-radius-lg': theme.borderRadius.lg,
		'--puck-shadow-sm': theme.shadows.sm,
		'--puck-shadow-md': theme.shadows.md,
		'--puck-shadow-lg': theme.shadows.lg,
	} as CSSProperties;
};

export const generateThemeCSS = (theme: PuckTheme): string => {
	const themeStyles = applyTheme(theme);
	const cssVars = Object.entries(themeStyles)
		.map(([key, value]) => {
			// Convert camelCase to kebab-case (e.g., --puck-color-primary -> --puck-color-primary)
			// The keys are already in the correct format from applyTheme
			return `  ${key}: ${value};`;
		})
		.join('\n');

	return `:root {\n${cssVars}\n}`;
};

export const mergeThemes = (
	base: PuckTheme,
	override: Partial<PuckTheme>
): PuckTheme => {
	return {
		colors: {
			...base.colors,
			...(override.colors as Partial<PuckTheme['colors']> || {}),
		},
		typography: {
			...base.typography,
			...(override.typography as Partial<PuckTheme['typography']> || {}),
		},
		spacing: {
			...base.spacing,
			...(override.spacing as Partial<PuckTheme['spacing']> || {}),
		},
		borderRadius: {
			...base.borderRadius,
			...(override.borderRadius as Partial<PuckTheme['borderRadius']> || {}),
		},
		shadows: {
			...base.shadows,
			...(override.shadows as Partial<PuckTheme['shadows']> || {}),
		},
	};
};

