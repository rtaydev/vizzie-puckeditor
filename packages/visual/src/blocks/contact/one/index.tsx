import { ComponentConfig } from '@measured/puck';

import { Section } from '../../../components/section';
import { WithLayout, withLayout } from '../../../components/layout';
import {
	sectionFields,
	type SectionStyleProps,
} from '../../../config/sectionFields';
import styles from './styles.module.css';
import { IconPickerField } from '../../../fields/IconPickerField';
import * as LucideIcons from 'lucide-react';

interface ContactItem {
	icon: string;
	label: string;
	description: string;
	linkText: string;
	linkUrl: string;
}

export type ContactOneProps = WithLayout<
	SectionStyleProps & {
		title?: string;
		description?: string;
		contactItems?: ContactItem[];
	}
>;

const ContactOneInner: ComponentConfig<ContactOneProps> = {
	fields: {
		title: {
			type: 'text',
			label: 'Title',
		},
		description: {
			type: 'textarea',
			label: 'Description',
		},
		contactItems: {
			type: 'array',
			label: 'Contact Items',
			getItemSummary: (item: { label?: string }) =>
				item?.label || 'Contact Item',
			arrayFields: {
				icon: {
					type: 'custom',
					label: 'Icon',
					// @ts-ignore
					render: IconPickerField,
				},
				label: { type: 'text', label: 'Label' },
				description: { type: 'text', label: 'Description' },
				linkText: { type: 'text', label: 'Link Text' },
				linkUrl: { type: 'text', label: 'Link URL' },
			},
			defaultItemProps: {
				icon: 'Mail',
				label: 'Email',
				description: 'We respond to all emails within 24 hours.',
				linkText: 'example@shadcnblocks.com',
				linkUrl: 'mailto:example@shadcnblocks.com',
			},
		},
		...sectionFields,
	},
	defaultProps: {
		title: 'Contact Us',
		description: 'Contact the support team at Shadcnblocks.',
		contactItems: [
			{
				icon: 'Mail',
				label: 'Email',
				description: 'We respond to all emails within 24 hours.',
				linkText: 'example@shadcnblocks.com',
				linkUrl: 'mailto:example@shadcnblocks.com',
			},
			{
				icon: 'MapPin',
				label: 'Address',
				description: '123 Main St, Anytown, USA',
				linkText: 'Get Directions',
				linkUrl: 'https://maps.app.goo.gl/1234567890',
			},
			{
				icon: 'Phone',
				label: 'Phone',
				description: '123-456-7890',
				linkText: 'Call Us',
				linkUrl: 'tel:1234567890',
			},
			{
				icon: 'MessageCircle',
				label: 'Chat',
				description: 'Chat with us',
				linkText: 'Start Chat',
				linkUrl: 'https://chat.example.com',
			},
		],
	},
	render: ({
		title,
		description,
		contactItems,
		sectionStyle,
	}: ContactOneProps) => {
		const backgroundColor =
			sectionStyle?.backgroundColor === 'custom'
				? sectionStyle?.backgroundColorCustom
				: sectionStyle?.backgroundColor;

		const getIconComponent = (iconName: string): React.ReactNode => {
			if (!iconName) return null;
			const IconComponent = (LucideIcons as any)[iconName];
			if (!IconComponent) return null;
			return <IconComponent className="size-6" />;
		};

		return (
			<Section
				backgroundColor={backgroundColor}
				paddingHorizontal={sectionStyle?.paddingHorizontal || '0rem'}
				paddingVertical={sectionStyle?.paddingVertical || '0rem'}
				alignItems={sectionStyle?.alignItems}
				maxWidth={sectionStyle?.maxWidth || '1280px'}
			>
				<div className={styles.container}>
					<div className={styles.header}>
						{title && <h1 className={styles.title}>{title}</h1>}
						{description && <p className={styles.description}>{description}</p>}
					</div>
					<div className={styles.grid}>
						{contactItems?.map((item, index) => (
							<div key={index} className={styles.card}>
								<span className={styles.iconWrapper}>
									{getIconComponent(item.icon)}
								</span>
								<p className={styles.label}>{item.label}</p>
								<p className={styles.cardDescription}>{item.description}</p>
								<a href={item.linkUrl} className={styles.link}>
									{item.linkText}
								</a>
							</div>
						))}
					</div>
				</div>
			</Section>
		);
	},
};

export const ContactOneBlock: ComponentConfig<ContactOneProps> =
	withLayout(ContactOneInner);
