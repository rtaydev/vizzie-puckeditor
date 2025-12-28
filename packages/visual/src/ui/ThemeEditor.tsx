import { createPortal } from 'react-dom';
import { useState } from 'react';
import styles from './styles.module.css';
import { PuckTheme } from '../config/types';

interface ThemeEditorProps {
	theme: PuckTheme;
	setTheme: (theme: PuckTheme) => void;
	showThemeEditor: boolean;
	setShowThemeEditor: (showThemeEditor: boolean) => void;
}

export const ThemeEditor = ({
	theme,
	setTheme,
	showThemeEditor,
	setShowThemeEditor,
}: ThemeEditorProps) => {
	const [formTheme, setFormTheme] = useState<PuckTheme>(theme);

	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setShowThemeEditor(false);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setTheme(formTheme);
		setShowThemeEditor(false);
	};

	const handleCancel = () => {
		setFormTheme(theme);
		setShowThemeEditor(false);
	};

	const ColorInput = ({
		label,
		value,
		onChange,
	}: {
		label: string;
		value: string;
		onChange: (value: string) => void;
	}) => (
		<div className={styles.formGroup}>
			<label>{label}</label>
			<div className={styles.colorInputWrapper}>
				<input
					type='color'
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={styles.colorInput}
				/>
				<input
					type='text'
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={styles.textInput}
					placeholder='#000000'
				/>
			</div>
		</div>
	);

	const TextInput = ({
		label,
		value,
		onChange,
	}: {
		label: string;
		value: string;
		onChange: (value: string) => void;
	}) => (
		<div className={styles.formGroup}>
			<label>{label}</label>
			<input
				type='text'
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={styles.textInput}
			/>
		</div>
	);

	return (
		<>
			{showThemeEditor &&
				createPortal(
					<div className={styles.themeEditor} onClick={handleBackgroundClick}>
						<form className={styles.themeEditorContent} onSubmit={handleSubmit}>
							<div className={styles.formHeader}>
								<h1>Theme Editor</h1>
								<p>Customize your design system</p>
							</div>

							<div className={styles.formScroll}>
								{/* Colors Section */}
								<fieldset className={styles.section}>
									<legend>Colors</legend>
									<div className={styles.grid}>
										<ColorInput
											label='Primary'
											value={formTheme.colors.primary}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, primary: value },
												})
											}
										/>
										<ColorInput
											label='Secondary'
											value={formTheme.colors.secondary}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, secondary: value },
												})
											}
										/>
										<ColorInput
											label='Background'
											value={formTheme.colors.background}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, background: value },
												})
											}
										/>
										<ColorInput
											label='Background Secondary'
											value={formTheme.colors.backgroundSecondary}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: {
														...formTheme.colors,
														backgroundSecondary: value,
													},
												})
											}
										/>
										<ColorInput
											label='Background Tertiary'
											value={formTheme.colors.backgroundTertiary}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: {
														...formTheme.colors,
														backgroundTertiary: value,
													},
												})
											}
										/>
										<ColorInput
											label='Text'
											value={formTheme.colors.text}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, text: value },
												})
											}
										/>
										<ColorInput
											label='Text Secondary'
											value={formTheme.colors.textSecondary}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, textSecondary: value },
												})
											}
										/>
										<ColorInput
											label='Text Tertiary'
											value={formTheme.colors.textTertiary}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, textTertiary: value },
												})
											}
										/>
										<ColorInput
											label='Border'
											value={formTheme.colors.border}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, border: value },
												})
											}
										/>
										<ColorInput
											label='Border Secondary'
											value={formTheme.colors.borderSecondary}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: {
														...formTheme.colors,
														borderSecondary: value,
													},
												})
											}
										/>
										<ColorInput
											label='Border Tertiary'
											value={formTheme.colors.borderTertiary}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: {
														...formTheme.colors,
														borderTertiary: value,
													},
												})
											}
										/>
										<ColorInput
											label='Button Primary'
											value={formTheme.colors.buttonPrimary}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, buttonPrimary: value },
												})
											}
										/>
										<ColorInput
											label='Button Primary Text'
											value={formTheme.colors.buttonPrimaryText}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: {
														...formTheme.colors,
														buttonPrimaryText: value,
													},
												})
											}
										/>
										<ColorInput
											label='Button Secondary'
											value={formTheme.colors.buttonSecondary}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: {
														...formTheme.colors,
														buttonSecondary: value,
													},
												})
											}
										/>
										<ColorInput
											label='Button Secondary Text'
											value={formTheme.colors.buttonSecondaryText}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: {
														...formTheme.colors,
														buttonSecondaryText: value,
													},
												})
											}
										/>
										<ColorInput
											label='Input Background'
											value={formTheme.colors.inputBackground}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: {
														...formTheme.colors,
														inputBackground: value,
													},
												})
											}
										/>
										<ColorInput
											label='Input Border'
											value={formTheme.colors.inputBorder}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, inputBorder: value },
												})
											}
										/>
										<ColorInput
											label='Input Text'
											value={formTheme.colors.inputText}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, inputText: value },
												})
											}
										/>
										<ColorInput
											label='Preview Background'
											value={formTheme.colors.previewBackground}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: {
														...formTheme.colors,
														previewBackground: value,
													},
												})
											}
										/>
										<ColorInput
											label='Header Background'
											value={formTheme.colors.headerBackground}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: {
														...formTheme.colors,
														headerBackground: value,
													},
												})
											}
										/>
										<ColorInput
											label='Header Border'
											value={formTheme.colors.headerBorder}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													colors: { ...formTheme.colors, headerBorder: value },
												})
											}
										/>
									</div>
								</fieldset>

								{/* Typography Section */}
								<fieldset className={styles.section}>
									<legend>Typography</legend>
									<div className={styles.grid}>
										<TextInput
											label='Font Sans'
											value={formTheme.typography.fontSans}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													typography: {
														...formTheme.typography,
														fontSans: value,
													},
												})
											}
										/>
										<TextInput
											label='Font Mono'
											value={formTheme.typography.fontMono}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													typography: {
														...formTheme.typography,
														fontMono: value,
													},
												})
											}
										/>
										<TextInput
											label='Font Size Base'
											value={formTheme.typography.fontSizeBase}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													typography: {
														...formTheme.typography,
														fontSizeBase: value,
													},
												})
											}
										/>
										<TextInput
											label='Font Size Small'
											value={formTheme.typography.fontSizeSmall}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													typography: {
														...formTheme.typography,
														fontSizeSmall: value,
													},
												})
											}
										/>
										<TextInput
											label='Font Size Large'
											value={formTheme.typography.fontSizeLarge}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													typography: {
														...formTheme.typography,
														fontSizeLarge: value,
													},
												})
											}
										/>
										<TextInput
											label='Font Weight Normal'
											value={formTheme.typography.fontWeightNormal}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													typography: {
														...formTheme.typography,
														fontWeightNormal: value,
													},
												})
											}
										/>
										<TextInput
											label='Font Weight Medium'
											value={formTheme.typography.fontWeightMedium}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													typography: {
														...formTheme.typography,
														fontWeightMedium: value,
													},
												})
											}
										/>
										<TextInput
											label='Font Weight Bold'
											value={formTheme.typography.fontWeightBold}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													typography: {
														...formTheme.typography,
														fontWeightBold: value,
													},
												})
											}
										/>
									</div>
								</fieldset>

								{/* Spacing Section */}
								<fieldset className={styles.section}>
									<legend>Spacing</legend>
									<div className={styles.grid}>
										<TextInput
											label='XS'
											value={formTheme.spacing.xs}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													spacing: { ...formTheme.spacing, xs: value },
												})
											}
										/>
										<TextInput
											label='SM'
											value={formTheme.spacing.sm}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													spacing: { ...formTheme.spacing, sm: value },
												})
											}
										/>
										<TextInput
											label='MD'
											value={formTheme.spacing.md}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													spacing: { ...formTheme.spacing, md: value },
												})
											}
										/>
										<TextInput
											label='LG'
											value={formTheme.spacing.lg}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													spacing: { ...formTheme.spacing, lg: value },
												})
											}
										/>
										<TextInput
											label='XL'
											value={formTheme.spacing.xl}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													spacing: { ...formTheme.spacing, xl: value },
												})
											}
										/>
									</div>
								</fieldset>

								{/* Border Radius Section */}
								<fieldset className={styles.section}>
									<legend>Border Radius</legend>
									<div className={styles.grid}>
										<TextInput
											label='SM'
											value={formTheme.borderRadius.sm}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													borderRadius: {
														...formTheme.borderRadius,
														sm: value,
													},
												})
											}
										/>
										<TextInput
											label='MD'
											value={formTheme.borderRadius.md}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													borderRadius: {
														...formTheme.borderRadius,
														md: value,
													},
												})
											}
										/>
										<TextInput
											label='LG'
											value={formTheme.borderRadius.lg}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													borderRadius: {
														...formTheme.borderRadius,
														lg: value,
													},
												})
											}
										/>
									</div>
								</fieldset>

								{/* Shadows Section */}
								<fieldset className={styles.section}>
									<legend>Shadows</legend>
									<div className={styles.grid}>
										<TextInput
											label='SM'
											value={formTheme.shadows.sm}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													shadows: { ...formTheme.shadows, sm: value },
												})
											}
										/>
										<TextInput
											label='MD'
											value={formTheme.shadows.md}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													shadows: { ...formTheme.shadows, md: value },
												})
											}
										/>
										<TextInput
											label='LG'
											value={formTheme.shadows.lg}
											onChange={(value) =>
												setFormTheme({
													...formTheme,
													shadows: { ...formTheme.shadows, lg: value },
												})
											}
										/>
									</div>
								</fieldset>
							</div>

							<div className={styles.formActions}>
								<button type='submit' className={styles.submitBtn}>
									Save Changes
								</button>
								<button
									type='button'
									onClick={handleCancel}
									className={styles.cancelBtn}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>,
					document.body
				)}
		</>
	);
};
