import { createPortal } from 'react-dom';
import { memo, useState, useCallback } from 'react';
import styles from './styles.module.css';
import { PuckTheme } from '../config/types';
import { defaultPuckTheme } from '../config/defaultTheme';

interface ThemeEditorProps {
	theme: PuckTheme;
	setTheme: (theme: PuckTheme) => void;
	showThemeEditor: boolean;
	setShowThemeEditor: (showThemeEditor: boolean) => void;
}

interface ColorInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

const ColorInput = memo(({ label, value, onChange }: ColorInputProps) => (
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
));

interface TextInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

const TextInput = memo(({ label, value, onChange }: TextInputProps) => (
	<div className={styles.formGroup}>
		<label>{label}</label>
		<input
			type='text'
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className={styles.textInput}
		/>
	</div>
));

export const ThemeEditor = memo(
	({
		theme,
		setTheme,
		showThemeEditor,
		setShowThemeEditor,
	}: ThemeEditorProps) => {
		const [formTheme, setFormTheme] = useState<PuckTheme>(theme);

		const handleBackgroundClick = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (e.target === e.currentTarget) {
					setShowThemeEditor(false);
				}
			},
			[setShowThemeEditor]
		);

		const handleUpdateFormTheme = useCallback((key: string, value: string) => {
			const keys = key.split('.');
			const lastKey = keys.pop();
			const parentKey = keys[0] as keyof PuckTheme;
			setFormTheme((prevState) => ({
				...prevState,
				[parentKey]: {
					...prevState[parentKey],
					[lastKey as string]: value,
				},
			}));
		}, []);

		const handleReset = useCallback(() => {
			setFormTheme(defaultPuckTheme);
		}, []);

		const handleSubmit = useCallback(
			(e: React.FormEvent<HTMLFormElement>) => {
				e.preventDefault();
				setTheme(formTheme);
				setShowThemeEditor(false);
			},
			[formTheme, setTheme, setShowThemeEditor]
		);

		const handleCancel = useCallback(() => {
			setFormTheme(theme);
			setShowThemeEditor(false);
		}, [theme, setShowThemeEditor]);

		return (
			<>
				{showThemeEditor &&
					createPortal(
						<div className={styles.themeEditor} onClick={handleBackgroundClick}>
							<form
								className={styles.themeEditorContent}
								onSubmit={handleSubmit}
							>
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
													handleUpdateFormTheme('colors.primary', value)
												}
											/>
											<ColorInput
												label='Secondary'
												value={formTheme.colors.secondary}
												onChange={(value) =>
													handleUpdateFormTheme('colors.secondary', value)
												}
											/>
											<ColorInput
												label='Background'
												value={formTheme.colors.background}
												onChange={(value) =>
													handleUpdateFormTheme('colors.background', value)
												}
											/>
											<ColorInput
												label='Background Secondary'
												value={formTheme.colors.backgroundSecondary}
												onChange={(value) =>
													handleUpdateFormTheme(
														'colors.backgroundSecondary',
														value
													)
												}
											/>
											<ColorInput
												label='Background Tertiary'
												value={formTheme.colors.backgroundTertiary}
												onChange={(value) =>
													handleUpdateFormTheme(
														'colors.backgroundTertiary',
														value
													)
												}
											/>
											<ColorInput
												label='Text'
												value={formTheme.colors.text}
												onChange={(value) =>
													handleUpdateFormTheme('colors.text', value)
												}
											/>
											<ColorInput
												label='Text Secondary'
												value={formTheme.colors.textSecondary}
												onChange={(value) =>
													handleUpdateFormTheme('colors.textSecondary', value)
												}
											/>
											<ColorInput
												label='Text Tertiary'
												value={formTheme.colors.textTertiary}
												onChange={(value) =>
													handleUpdateFormTheme('colors.textTertiary', value)
												}
											/>
											<ColorInput
												label='Border'
												value={formTheme.colors.border}
												onChange={(value) =>
													handleUpdateFormTheme('colors.border', value)
												}
											/>
											<ColorInput
												label='Border Secondary'
												value={formTheme.colors.borderSecondary}
												onChange={(value) =>
													handleUpdateFormTheme('colors.borderSecondary', value)
												}
											/>
											<ColorInput
												label='Border Tertiary'
												value={formTheme.colors.borderTertiary}
												onChange={(value) =>
													handleUpdateFormTheme('colors.borderTertiary', value)
												}
											/>
											<ColorInput
												label='Button Primary'
												value={formTheme.colors.buttonPrimary}
												onChange={(value) =>
													handleUpdateFormTheme('colors.buttonPrimary', value)
												}
											/>
											<ColorInput
												label='Button Primary Text'
												value={formTheme.colors.buttonPrimaryText}
												onChange={(value) =>
													handleUpdateFormTheme(
														'colors.buttonPrimaryText',
														value
													)
												}
											/>
											<ColorInput
												label='Button Secondary'
												value={formTheme.colors.buttonSecondary}
												onChange={(value) =>
													handleUpdateFormTheme('colors.buttonSecondary', value)
												}
											/>
											<ColorInput
												label='Button Secondary Text'
												value={formTheme.colors.buttonSecondaryText}
												onChange={(value) =>
													handleUpdateFormTheme(
														'colors.buttonSecondaryText',
														value
													)
												}
											/>
											<ColorInput
												label='Input Background'
												value={formTheme.colors.inputBackground}
												onChange={(value) =>
													handleUpdateFormTheme('colors.inputBackground', value)
												}
											/>
											<ColorInput
												label='Input Border'
												value={formTheme.colors.inputBorder}
												onChange={(value) =>
													handleUpdateFormTheme('colors.inputBorder', value)
												}
											/>
											<ColorInput
												label='Input Text'
												value={formTheme.colors.inputText}
												onChange={(value) =>
													handleUpdateFormTheme('colors.inputText', value)
												}
											/>
											<ColorInput
												label='Preview Background'
												value={formTheme.colors.previewBackground}
												onChange={(value) =>
													handleUpdateFormTheme(
														'colors.previewBackground',
														value
													)
												}
											/>
											<ColorInput
												label='Header Background'
												value={formTheme.colors.headerBackground}
												onChange={(value) =>
													handleUpdateFormTheme(
														'colors.headerBackground',
														value
													)
												}
											/>
											<ColorInput
												label='Header Border'
												value={formTheme.colors.headerBorder}
												onChange={(value) =>
													handleUpdateFormTheme('colors.headerBorder', value)
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
													handleUpdateFormTheme('typography.fontSans', value)
												}
											/>
											<TextInput
												label='Font Mono'
												value={formTheme.typography.fontMono}
												onChange={(value) =>
													handleUpdateFormTheme('typography.fontMono', value)
												}
											/>
											<TextInput
												label='Font Size Base'
												value={formTheme.typography.fontSizeBase}
												onChange={(value) =>
													handleUpdateFormTheme(
														'typography.fontSizeBase',
														value
													)
												}
											/>
											<TextInput
												label='Font Size Small'
												value={formTheme.typography.fontSizeSmall}
												onChange={(value) =>
													handleUpdateFormTheme(
														'typography.fontSizeSmall',
														value
													)
												}
											/>
											<TextInput
												label='Font Size Large'
												value={formTheme.typography.fontSizeLarge}
												onChange={(value) =>
													handleUpdateFormTheme(
														'typography.fontSizeLarge',
														value
													)
												}
											/>
											<TextInput
												label='Font Weight Normal'
												value={formTheme.typography.fontWeightNormal}
												onChange={(value) =>
													handleUpdateFormTheme(
														'typography.fontWeightNormal',
														value
													)
												}
											/>
											<TextInput
												label='Font Weight Medium'
												value={formTheme.typography.fontWeightMedium}
												onChange={(value) =>
													handleUpdateFormTheme(
														'typography.fontWeightMedium',
														value
													)
												}
											/>
											<TextInput
												label='Font Weight Bold'
												value={formTheme.typography.fontWeightBold}
												onChange={(value) =>
													handleUpdateFormTheme(
														'typography.fontWeightBold',
														value
													)
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
													handleUpdateFormTheme('spacing.xs', value)
												}
											/>
											<TextInput
												label='SM'
												value={formTheme.spacing.sm}
												onChange={(value) =>
													handleUpdateFormTheme('spacing.sm', value)
												}
											/>
											<TextInput
												label='MD'
												value={formTheme.spacing.md}
												onChange={(value) =>
													handleUpdateFormTheme('spacing.md', value)
												}
											/>
											<TextInput
												label='LG'
												value={formTheme.spacing.lg}
												onChange={(value) =>
													handleUpdateFormTheme('spacing.lg', value)
												}
											/>
											<TextInput
												label='XL'
												value={formTheme.spacing.xl}
												onChange={(value) =>
													handleUpdateFormTheme('spacing.xl', value)
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
													handleUpdateFormTheme('borderRadius.sm', value)
												}
											/>
											<TextInput
												label='MD'
												value={formTheme.borderRadius.md}
												onChange={(value) =>
													handleUpdateFormTheme('borderRadius.md', value)
												}
											/>
											<TextInput
												label='LG'
												value={formTheme.borderRadius.lg}
												onChange={(value) =>
													handleUpdateFormTheme('borderRadius.lg', value)
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
													handleUpdateFormTheme('shadows.sm', value)
												}
											/>
											<TextInput
												label='MD'
												value={formTheme.shadows.md}
												onChange={(value) =>
													handleUpdateFormTheme('shadows.md', value)
												}
											/>
											<TextInput
												label='LG'
												value={formTheme.shadows.lg}
												onChange={(value) =>
													handleUpdateFormTheme('shadows.lg', value)
												}
											/>
										</div>
									</fieldset>
								</div>

								<div className={styles.formActions}>
									<div>
										<button
											type='button'
											onClick={handleReset}
											className={styles.resetBtn}
										>
											Reset
										</button>
									</div>
									<div>
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
								</div>
							</form>
						</div>,
						document.body
					)}
			</>
		);
	}
);
