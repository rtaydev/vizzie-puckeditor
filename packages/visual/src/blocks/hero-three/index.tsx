import { ComponentConfig } from '@measured/puck';
import { useEffect } from 'react';
import React from 'react';
import * as LucideIcons from 'lucide-react';

import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import styles from './styles.module.css';
import { ImageUploadField } from '../../fields/ImageUploadField';
import { IconPickerField } from '../../fields/IconPickerField';

interface Feature {
	icon: string;
	title: string;
	description: string;
}

export type HeroThreeProps = WithLayout<
	SectionStyleProps & {
		badge?: string;
		heading: string;
		imageSrc?: string;
		imageAlt?: string;
		features?: Feature[];
	}
>;

const HeroThreeInner: ComponentConfig<HeroThreeProps> = {
	fields: {
		badge: {
			type: 'text',
			label: 'Badge',
		},
		heading: {
			type: 'text',
			label: 'Heading',
			contentEditable: true,
			// @ts-ignore
			labelIcon: null,
		},
		imageSrc: {
			type: 'custom',
			label: 'Image',
			// @ts-ignore
			render: ImageUploadField,
		},
		imageAlt: {
			type: 'text',
			label: 'Image Alt Text',
		},
		features: {
			type: 'array',
			label: 'Features',
			getItemSummary: (item: { title?: string }) =>
				item?.title || 'New feature',
			arrayFields: {
				icon: {
					type: 'custom',
					label: 'Icon',
					// @ts-ignore
					render: IconPickerField,
				},
				title: {
					type: 'text',
					label: 'Title',
				},
				description: {
					type: 'text',
					label: 'Description',
				},
			},
			defaultItemProps: {
				title: 'Feature',
				description: 'Feature description',
				icon: 'HandHelping',
			},
		},
		...sectionFields,
	},
	defaultProps: {
		badge: 'shadcnblocks.com',
		heading: 'Blocks built with Shadcn & Tailwind',
		imageSrc:
			'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
		imageAlt: 'placeholder',
		features: [
			{
				icon: 'HandHelping',
				title: 'Flexible Support',
				description:
					'Benefit from around-the-clock assistance to keep your business running smoothly.',
			},
			{
				icon: 'Users',
				title: 'Collaborative Tools',
				description:
					'Enhance teamwork with tools designed to simplify project management and communication.',
			},
			{
				icon: 'Zap',
				title: 'Lightning Fast Speed',
				description:
					'Experience the fastest load times with our high performance servers.',
			},
		],
	},
	render: ({ badge, heading, imageSrc, imageAlt, features, sectionStyle }) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		const getIconComponent = (iconName: string): React.ReactNode => {
			if (!iconName) return null;
			const IconComponent = (LucideIcons as any)[iconName];
			if (!IconComponent) return null;
			return <IconComponent className='h-auto w-5' />;
		};

		// Hide labelIcon for HeroThreeBlock fields only
		useEffect(() => {
			const heroThreeFieldLabels = [
				'Badge',
				'Heading',
				'Image URL',
				'Image Alt Text',
			];

			const hideIcons = () => {
				const labelElements = document.querySelectorAll(
					'[class*="_Input-label_"]'
				);
				labelElements.forEach((label) => {
					const labelText = label.textContent?.trim();
					if (heroThreeFieldLabels.includes(labelText || '')) {
						const inputWrapper = label.closest('[class*="_InputWrapper_"]');
						if (inputWrapper) {
							const labelIcon = inputWrapper.querySelector(
								'[class*="_Input-labelIcon_"]:has(.lucide-type)'
							);
							if (labelIcon) {
								(labelIcon as HTMLElement).classList.add(
									styles.hideHeroThreeLabelIcon
								);
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
					<div className={styles.header}>
						{badge && <div className={styles.badge}>{badge}</div>}
						<h1 className={styles.heading}>{heading}</h1>
					</div>
					<div className={styles.imageWrapper}>
						<img src={imageSrc} alt={imageAlt} className={styles.image} />
						<div className={styles.gradientOverlay}></div>
						<div className={styles.dotPatternTopRight}></div>
						<div className={styles.dotPatternTopLeft}></div>
					</div>
					<div className={styles.featuresContainer}>
						{features?.map((feature, index) => (
							<React.Fragment key={`${feature.title}-${index}`}>
								{index > 0 && <div className={styles.separator}></div>}
								<div className={styles.featureItem}>
									<div className={styles.iconWrapper}>
										{getIconComponent(feature.icon)}
									</div>
									<h3 className={styles.featureTitle}>{feature.title}</h3>
									<p className={styles.featureDescription}>
										{feature.description}
									</p>
								</div>
							</React.Fragment>
						))}
					</div>
				</div>
			</Section>
		);
	},
};

export const HeroThreeBlock: ComponentConfig<HeroThreeProps> =
	withLayout(HeroThreeInner);
