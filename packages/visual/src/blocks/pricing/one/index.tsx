'use client';

import { ComponentConfig } from '@measured/puck';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';

import { Section } from '../../../components/section';
import { WithLayout, withLayout } from '../../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../../config/sectionFields';
import styles from './styles.module.css';

interface PricingFeature {
	text: string;
}

interface PricingPlan {
	name: string;
	description: string;
	monthlyPrice: string;
	yearlyPrice: string;
	features: PricingFeature[];
	buttonText: string;
	buttonUrl: string;
	isPro?: boolean;
}

export type PricingOneProps = WithLayout<
	SectionStyleProps & {
		heading?: string;
		description?: string;
		plans?: PricingPlan[];
	}
>;

const PricingOneInner: ComponentConfig<PricingOneProps> = {
	fields: {
		heading: {
			type: 'text',
			label: 'Heading',
		},
		description: {
			type: 'textarea',
			label: 'Description',
		},
		plans: {
			type: 'array',
			label: 'Pricing Plans',
			getItemSummary: (item: { name?: string }) => item?.name || 'New plan',
			arrayFields: {
				name: {
					type: 'text',
					label: 'Plan Name',
				},
				description: {
					type: 'text',
					label: 'Plan Description',
				},
				monthlyPrice: {
					type: 'text',
					label: 'Monthly Price',
				},
				yearlyPrice: {
					type: 'text',
					label: 'Yearly Price',
				},
				features: {
					type: 'array',
					label: 'Features',
					getItemSummary: (feature: { text?: string }) =>
						feature?.text || 'New feature',
					arrayFields: {
						text: {
							type: 'text',
							label: 'Feature Text',
						},
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
				isPro: {
					type: 'radio',
					label: 'Show "Everything in Plus" text',
					options: [
						{ label: 'Yes', value: true },
						{ label: 'No', value: false },
					],
				},
			},
			defaultItemProps: {
				name: 'New Plan',
				description: 'Plan description',
				monthlyPrice: '$29',
				yearlyPrice: '$279',
				features: [
					{ text: 'Feature 1' },
					{ text: 'Feature 2' },
					{ text: 'Feature 3' },
				],
				buttonText: 'Purchase',
				buttonUrl: '#',
				isPro: false,
			},
		},
		...sectionFields,
	},
	defaultProps: {
		heading: 'Pricing',
		description: 'Check out our affordable pricing plans',
		plans: [
			{
				name: 'Plus',
				description: 'For personal use',
				monthlyPrice: '$19',
				yearlyPrice: '$179',
				features: [
					{ text: 'Up to 5 team members' },
					{ text: 'Basic components library' },
					{ text: 'Community support' },
					{ text: '1GB storage space' },
				],
				buttonText: 'Purchase',
				buttonUrl: 'https://shadcnblocks.com',
				isPro: false,
			},
			{
				name: 'Pro',
				description: 'For professionals',
				monthlyPrice: '$49',
				yearlyPrice: '$359',
				features: [
					{ text: 'Unlimited team members' },
					{ text: 'Advanced components' },
					{ text: 'Priority support' },
					{ text: 'Unlimited storage' },
				],
				buttonText: 'Purchase',
				buttonUrl: 'https://shadcnblocks.com',
				isPro: true,
			},
		],
	},
	render: ({ heading, description, plans, sectionStyle }: PricingOneProps) => {
		const [isYearly, setIsYearly] = useState(false);

		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingHorizontal={sectionStyle?.paddingHorizontal || '0rem'}
				paddingVertical={sectionStyle?.paddingVertical || '0rem'}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth || '100%'}
			>
				<div className={styles.container}>
					<div className={styles.header}>
						{heading && <h2 className={styles.heading}>{heading}</h2>}
						{description && <p className={styles.description}>{description}</p>}
						<div className={styles.toggle}>
							<span>Monthly</span>
							<button
								type='button'
								role='switch'
								aria-checked={isYearly}
								onClick={() => setIsYearly(!isYearly)}
								className={styles.switch}
								data-state={isYearly ? 'checked' : 'unchecked'}
							>
								<span
									className={styles.switchThumb}
									data-state={isYearly ? 'checked' : 'unchecked'}
								/>
							</button>
							<span>Yearly</span>
						</div>
					</div>
					<div className={styles.plans}>
						{plans?.map((plan, index) => (
							<div key={index} className={styles.card}>
								<div className={styles.cardHeader}>
									<h3 className={styles.cardTitle}>{plan.name}</h3>
									<p className={styles.cardDescription}>{plan.description}</p>
									<div className={styles.price}>
										<span className={styles.priceAmount}>
											{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
										</span>
										<span className={styles.pricePeriod}>
											{isYearly ? '/yr' : '/mo'}
										</span>
									</div>
								</div>
								<div className={styles.cardContent}>
									<div className={styles.separator} />
									{plan.isPro && (
										<p className={styles.proText}>Everything in Plus, and:</p>
									)}
									<ul className={styles.features}>
										{plan.features?.map((feature, featureIndex) => (
											<li key={featureIndex} className={styles.feature}>
												<CircleCheck className={styles.featureIcon} />
												<span>{feature.text}</span>
											</li>
										))}
									</ul>
								</div>
								<div className={styles.cardFooter}>
									<a href={plan.buttonUrl} className={styles.button}>
										{plan.buttonText}
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</Section>
		);
	},
};

export const PricingOneBlock: ComponentConfig<PricingOneProps> =
	withLayout(PricingOneInner);
