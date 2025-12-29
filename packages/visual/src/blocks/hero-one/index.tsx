import { ComponentConfig } from '@measured/puck';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import { Badge } from '../../components/ui/badge';
import { ImageUploadField } from '../../fields/ImageUploadField';
import styles from './styles.module.css';

export type HeroOneProps = WithLayout<
	SectionStyleProps & {
		badge?: string;
		heading: string;
		description: string;
		primaryButtonText?: string;
		primaryButtonUrl?: string;
		secondaryButtonText?: string;
		secondaryButtonUrl?: string;
		image?: string;
		imageAlt?: string;
	}
>;

const HeroOneInner: ComponentConfig<HeroOneProps> = {
	fields: {
		badge: {
			type: 'text',
			label: 'Badge',
			// @ts-ignore
			labelIcon: null,
		},
		heading: {
			type: 'text',
			label: 'Heading',
			contentEditable: true,
		},
		description: {
			type: 'text',
			label: 'Description',
			contentEditable: true,
		},
		primaryButtonText: {
			type: 'text',
			label: 'Primary Button Text',
		},
		primaryButtonUrl: {
			type: 'text',
			label: 'Primary Button URL',
		},
		secondaryButtonText: {
			type: 'text',
			label: 'Secondary Button Text',
		},
		secondaryButtonUrl: {
			type: 'text',
			label: 'Secondary Button URL',
		},
		image: {
			type: 'custom',
			label: 'Image',
			// @ts-ignore
			render: ImageUploadField,
		},
		imageAlt: {
			type: 'text',
			label: 'Image Alt Text',
			placeholder: 'Describe the image',
		},
		...sectionFields,
	},
	defaultProps: {
		badge: '✨ Your Website Builder',
		heading: 'Blocks Built With Shadcn & Tailwind',
		description:
			'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
		primaryButtonText: 'Discover all components',
		primaryButtonUrl: 'https://www.shadcnblocks.com',
		secondaryButtonText: 'View on GitHub',
		secondaryButtonUrl: 'https://www.shadcnblocks.com',
		image:
			'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
		imageAlt: 'Hero section demo image showing interface components',
	},
	render: ({
		badge,
		heading,
		description,
		primaryButtonText,
		primaryButtonUrl,
		secondaryButtonText,
		secondaryButtonUrl,
		image,
		imageAlt,
		sectionStyle,
	}) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		// Hide labelIcon for HeroOneBlock fields only
		useEffect(() => {
			const heroOneFieldLabels = [
				'Badge',
				'Heading',
				'Description',
				'Primary Button Text',
				'Primary Button URL',
				'Secondary Button Text',
				'Secondary Button URL',
			];

			const hideIcons = () => {
				const labelElements = document.querySelectorAll(
					'[class*="_Input-label_"]'
				);
				labelElements.forEach((label) => {
					const labelText = label.textContent?.trim();
					if (heroOneFieldLabels.includes(labelText || '')) {
						const inputWrapper = label.closest('[class*="_InputWrapper_"]');
						if (inputWrapper) {
							const labelIcon = inputWrapper.querySelector(
								'[class*="_Input-labelIcon_"]:has(.lucide-type)'
							);
							if (labelIcon) {
								(labelIcon as HTMLElement).classList.add(styles.hideLabelIcon);
							}
						}
					}
				});
			};

			hideIcons();
			// Re-run when DOM changes (Puck might dynamically update fields)
			const observer = new MutationObserver(hideIcons);
			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});

			return () => observer.disconnect();
		}, []);

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingVertical={sectionStyle?.paddingVertical || '0rem'}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth || '100%'}
			>
				<div className={styles.container}>
					<div className={styles.heroGrid}>
						{/* Left Column - Content */}
						<div className={styles.heroContent}>
							{badge && (
								<div className={styles.badgeContainer}>
									<Badge variant='outline'>
										{badge}
										<ArrowUpRight size={16} className={styles.badgeIcon} />
									</Badge>
								</div>
							)}
							<h1 className={styles.heading}>{heading}</h1>
							<p className={styles.description}>{description}</p>
							<div className={styles.buttonsContainer}>
								{primaryButtonText && primaryButtonUrl && (
									<a href={primaryButtonUrl} className={styles.primaryButton}>
										{primaryButtonText}
									</a>
								)}
								{secondaryButtonText && secondaryButtonUrl && (
									<a
										href={secondaryButtonUrl}
										className={styles.secondaryButton}
									>
										{secondaryButtonText}
										<ArrowRight size={16} />
									</a>
								)}
							</div>
						</div>

						{/* Right Column - Image */}
						{image && (
							<div className={styles.imageContainer}>
								<img
									src={image}
									alt={imageAlt || ''}
									className={styles.image}
								/>
							</div>
						)}
					</div>
				</div>
			</Section>
		);
	},
};

export const HeroOneBlock: ComponentConfig<HeroOneProps> =
	withLayout(HeroOneInner);
