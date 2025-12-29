import { ComponentConfig } from '@measured/puck';
import { useState } from 'react';
import { Section } from '../../../components/section';
import { WithLayout, withLayout } from '../../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../../config/sectionFields';
import { ImageUploadField } from '../../../fields/ImageUploadField';
import styles from './styles.module.css';

interface Feature {
	title: string;
	description: string;
	image: string;
}

export type FeaturesTwoProps = WithLayout<
	SectionStyleProps & {
		features?: Feature[];
	}
>;

const FeaturesTwoInner: ComponentConfig<FeaturesTwoProps> = {
	fields: {
		features: {
			type: 'array',
			label: 'Features',
			getItemSummary: (item: { title?: string }) =>
				item?.title || 'New feature',
			arrayFields: {
				title: {
					type: 'text',
					label: 'Title',
				},
				description: {
					type: 'textarea',
					label: 'Description',
				},
				image: {
					type: 'custom',
					label: 'Image',
					// @ts-ignore
					render: ImageUploadField,
				},
			},
			defaultItemProps: {
				title: 'Feature Title',
				description: 'Feature description goes here.',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
			},
		},
		...sectionFields,
	},
	defaultProps: {
		features: [
			{
				title: 'Ready-to-Use UI Blocks',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
				description:
					'Browse through our extensive collection of pre-built UI blocks designed with shadcn/ui. Each block is carefully crafted to be responsive, accessible, and easily customizable. Simply copy and paste the code into your project.',
			},
			{
				title: 'Tailwind CSS & TypeScript',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg',
				description:
					"Built with Tailwind CSS for rapid styling and TypeScript for type safety. Our blocks leverage the full power of Tailwind's utility classes while maintaining clean, type-safe code that integrates seamlessly with your Next.js projects.",
			},
			{
				title: 'Dark Mode & Customization',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg',
				description:
					"Every block supports dark mode out of the box and can be customized to match your brand. Modify colors, spacing, and typography using Tailwind's configuration. The shadcn/ui theming system makes it easy to maintain consistency across your site.",
			},
			{
				title: 'Accessibility First',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg',
				description:
					'All blocks are built with accessibility in mind, following WCAG guidelines. They include proper ARIA labels, keyboard navigation support, and semantic HTML structure. Ensure your website is usable by everyone without extra effort.',
			},
			{
				title: 'Modern Development Stack',
				image:
					'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg',
				description:
					'Built for modern web development with React 18, Next.js 14, and the latest shadcn/ui components. Take advantage of React Server Components, TypeScript strict mode, and other cutting-edge features while maintaining excellent performance.',
			},
		],
	},
	render: ({ features, sectionStyle }: FeaturesTwoProps) => {
		const [activeTabId, setActiveTabId] = useState<number>(0);
		const [activeImage, setActiveImage] = useState(features?.[0]?.image || '');

		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingVertical={sectionStyle?.paddingVertical || '0rem'}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth || '100%'}
			>
				<div className={styles.container}>
					<div className={styles.grid}>
						<div className={styles.accordionWrapper}>
							<div className={styles.accordion}>
								{features?.map((feature, index) => (
									<div key={index} className={styles.accordionItem}>
										<button
											onClick={() => {
												setActiveImage(feature.image);
												setActiveTabId(index);
											}}
											className={styles.accordionTrigger}
											aria-expanded={activeTabId === index}
										>
											<h4
												className={
													index === activeTabId
														? styles.accordionTitleActive
														: styles.accordionTitle
												}
											>
												{feature.title}
											</h4>
											<svg
												className={
													index === activeTabId
														? styles.accordionIconActive
														: styles.accordionIcon
												}
												width='15'
												height='15'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path d='m7.5 12.5-5-5h10l-5 5Z' fill='currentColor' />
											</svg>
										</button>
										{activeTabId === index && (
											<div className={styles.accordionContent}>
												<p className={styles.accordionDescription}>
													{feature.description}
												</p>
												<div className={styles.mobileImage}>
													<img
														src={feature.image}
														alt={feature.title}
														className={styles.mobileImageElement}
													/>
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
						<div className={styles.imageWrapper}>
							<img
								src={activeImage}
								alt='Feature preview'
								className={styles.image}
							/>
						</div>
					</div>
				</div>
			</Section>
		);
	},
};

export const FeaturesTwoBlock: ComponentConfig<FeaturesTwoProps> =
	withLayout(FeaturesTwoInner);
