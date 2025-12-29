import { ComponentConfig } from '@measured/puck';
import { useEffect } from 'react';
import React from 'react';
import * as LucideIcons from 'lucide-react';

import { Section } from '../../../components/section';
import { WithLayout, withLayout } from '../../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../../config/sectionFields';
import styles from './styles.module.css';
import { IconPickerField } from '../../../fields/IconPickerField';

interface Feature {
	heading: string;
	description: string;
	icon: string;
}

export type FeaturesOneProps = WithLayout<
	SectionStyleProps & {
		title?: string;
		features?: Feature[];
		buttonText?: string;
		buttonUrl?: string;
	}
>;

const FeaturesOneInner: ComponentConfig<FeaturesOneProps> = {
	fields: {
		title: {
			type: 'text',
			label: 'Title',
			contentEditable: true,
			// @ts-ignore
			labelIcon: null,
		},
		features: {
			type: 'array',
			label: 'Features',
			getItemSummary: (item: { heading?: string }) =>
				item?.heading || 'New feature',
			arrayFields: {
				icon: {
					type: 'custom',
					label: 'Icon',
					// @ts-ignore
					render: IconPickerField,
				},
				heading: {
					type: 'text',
					label: 'Heading',
				},
				description: {
					type: 'text',
					label: 'Description',
				},
			},
			defaultItemProps: {
				heading: 'Feature',
				description: 'Feature description',
				icon: 'GitPullRequest',
			},
		},
		buttonText: {
			type: 'text',
			label: 'Button Text',
		},
		buttonUrl: {
			type: 'text',
			label: 'Button URL',
		},
		...sectionFields,
	},
	defaultProps: {
		title: 'Fully featured components for Shadcn UI & Tailwind',
		features: [
			{
				heading: 'Quality',
				description:
					'Built with attention to detail and best practices. Every component is thoroughly tested and follows modern React patterns for reliability and performance.',
				icon: 'GitPullRequest',
			},
			{
				heading: 'Experience',
				description:
					'Crafted with user experience in mind. Each component is designed to be intuitive, accessible, and provide smooth interactions across all devices.',
				icon: 'SquareKanban',
			},
			{
				heading: 'Support',
				description:
					'Comprehensive documentation and community support. Get help when you need it with detailed guides, examples, and active community assistance.',
				icon: 'RadioTower',
			},
			{
				heading: 'Innovation',
				description:
					'Cutting-edge design patterns and modern web technologies. Stay ahead with the latest trends in UI/UX design and development practices.',
				icon: 'WandSparkles',
			},
			{
				heading: 'Results',
				description:
					'Proven track record of successful implementations. These components have been battle-tested in real-world applications and deliver consistent results.',
				icon: 'Layers',
			},
			{
				heading: 'Efficiency',
				description:
					'Optimized for performance and developer productivity. Lightweight, fast-loading components that help you build faster without compromising on quality.',
				icon: 'BatteryCharging',
			},
		],
		buttonText: 'More Features',
		buttonUrl: 'https://shadcnblocks.com',
	},
	render: ({
		title,
		features,
		buttonText,
		buttonUrl,
		sectionStyle,
	}: FeaturesOneProps) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		const getIconComponent = (iconName: string): React.ReactNode => {
			if (!iconName) return null;
			const IconComponent = (LucideIcons as any)[iconName];
			if (!IconComponent) return null;
			return <IconComponent className='size-6' />;
		};

		// Hide labelIcon for FeaturesOneBlock fields only
		useEffect(() => {
			const featuresOneFieldLabels = ['Title'];

			const hideIcons = () => {
				const labelElements = document.querySelectorAll(
					'[class*="_Input-label_"]'
				);
				labelElements.forEach((label) => {
					const labelText = label.textContent?.trim();
					if (featuresOneFieldLabels.includes(labelText || '')) {
						const inputWrapper = label.closest('[class*="_InputWrapper_"]');
						if (inputWrapper) {
							const labelIcon = inputWrapper.querySelector(
								'[class*="_Input-labelIcon_"]:has(.lucide-type)'
							);
							if (labelIcon) {
								(labelIcon as HTMLElement).classList.add(
									styles.hideFeaturesOneLabelIcon
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
					{title && (
						<div className={styles.header}>
							<h2 className={styles.title}>{title}</h2>
						</div>
					)}
					<div className={styles.grid}>
						{features?.map((feature: Feature, i: number) => (
							<div key={i} className={styles.featureItem}>
								<div className={styles.iconWrapper}>
									{getIconComponent(feature.icon)}
								</div>
								<h3 className={styles.heading}>{feature.heading}</h3>
								<p className={styles.description}>{feature.description}</p>
							</div>
						))}
					</div>
					{buttonUrl && (
						<div className={styles.buttonWrapper}>
							<a href={buttonUrl} className={styles.button}>
								{buttonText}
							</a>
						</div>
					)}
				</div>
			</Section>
		);
	},
};

export const FeaturesOneBlock: ComponentConfig<FeaturesOneProps> =
	withLayout(FeaturesOneInner);
