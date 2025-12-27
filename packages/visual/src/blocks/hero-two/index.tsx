import { ComponentConfig } from '@measured/puck';
import { useEffect } from 'react';
import { Section } from '../../components/section';
import { WithLayout, withLayout } from '../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../config/sectionFields';
import styles from './styles.module.css';

export type HeroTwoProps = WithLayout<
	SectionStyleProps & {
		heading: string;
		description: string;
		buttonText?: string;
		buttonUrl?: string;
	}
>;

const HeroTwoInner: ComponentConfig<HeroTwoProps> = {
	fields: {
		heading: {
			type: 'text',
			label: 'Heading',
			contentEditable: true,
			// @ts-ignore
			labelIcon: null,
		},
		description: {
			type: 'text',
			label: 'Description',
			contentEditable: true,
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
		heading: 'A Collection of Components Built With Shadcn & Tailwind',
		description:
			'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
		buttonText: 'Discover all components',
		buttonUrl: 'https://www.shadcnblocks.com',
	},
	render: ({ heading, description, buttonText, buttonUrl, sectionStyle }) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		// Hide labelIcon for HeroTwoBlock fields only
		useEffect(() => {
			const heroTwoFieldLabels = [
				'Heading',
				'Description',
				'Button Text',
				'Button URL',
			];

			const hideIcons = () => {
				const labelElements = document.querySelectorAll(
					'[class*="_Input-label_"]'
				);
				labelElements.forEach((label) => {
					const labelText = label.textContent?.trim();
					if (heroTwoFieldLabels.includes(labelText || '')) {
						const inputWrapper = label.closest('[class*="_InputWrapper_"]');
						if (inputWrapper) {
							const labelIcon = inputWrapper.querySelector(
								'[class*="_Input-labelIcon_"]:has(.lucide-type)'
							);
							if (labelIcon) {
								(labelIcon as HTMLElement).classList.add(
									styles.hideHeroTwoLabelIcon
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
				paddingTop={sectionStyle?.paddingTop || '0rem'}
				paddingBottom={sectionStyle?.paddingBottom || '0rem'}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth || '100%'}
			>
				<div className={styles.container}>
					<div className={styles.content}>
						<h1 className={styles.heading}>{heading}</h1>
						<p className={styles.description}>{description}</p>
					</div>
					{buttonText && buttonUrl && (
						<a href={buttonUrl} className={styles.button}>
							{buttonText}
						</a>
					)}
				</div>
			</Section>
		);
	},
};

export const HeroTwoBlock: ComponentConfig<HeroTwoProps> =
	withLayout(HeroTwoInner);
