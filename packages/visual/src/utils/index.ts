type OptionsObj = Record<string, any>;
type Options = string | OptionsObj;

const joinClasses = (
	...classes: (string | undefined | null | false)[]
): string => {
	return classes.filter((cls): cls is string => Boolean(cls)).join(' ');
};

export const getGlobalClassName = (
	rootClass: string,
	options: Options
): string => {
	if (typeof options === 'string') {
		return `${rootClass}-${options}`;
	} else {
		const classes: string[] = [rootClass];
		for (let option in options) {
			if (options[option]) {
				classes.push(`${rootClass}--${option}`);
			}
		}
		return joinClasses(...classes);
	}
};

const getClassNameFactory =
	(
		rootClass: string,
		styles: Record<string, string>,
		config: { baseClass?: string } = { baseClass: '' }
	) =>
	(options: Options = {}): string => {
		if (typeof options === 'string') {
			// Empty string means return base class
			if (options === '') {
				return config.baseClass + (styles[rootClass] || '');
			}

			const descendant = options;
			const style = styles[`${rootClass}-${descendant}`];

			if (style) {
				return config.baseClass + style;
			}

			// If descendant not found, return base class
			return config.baseClass + (styles[rootClass] || '');
		} else if (typeof options === 'object') {
			const modifiers = options;
			const classes: string[] = [];

			// Always add base class first if it exists
			const baseClass = styles[rootClass];
			if (baseClass) {
				classes.push(baseClass);
			}

			// Add modifier classes
			for (let modifier in modifiers) {
				if (modifiers[modifier]) {
					const modifierKey = `${rootClass}--${modifier}`;
					const modifierClass = styles[modifierKey];
					if (modifierClass) {
						classes.push(modifierClass);
					}
				}
			}

			const result = joinClasses(...classes);
			// If no classes found, at least return base class or empty string
			return config.baseClass + (result || (styles[rootClass] || ''));
		} else {
			return config.baseClass + (styles[rootClass] || '');
		}
	};

export { getClassNameFactory };

// Image upload constants
export const MAX_BYTES = 10 * 1024 * 1024; // 10MB

export const SAFE_DATA_IMAGE_PREFIXES = [
	'data:image/png;base64,',
	'data:image/jpeg;base64,',
	'data:image/jpg;base64,',
	'data:image/gif;base64,',
	'data:image/webp;base64,',
];

/**
 * Sanitize image source to prevent XSS attacks.
 * Only allows:
 * - data: URLs with safe image MIME types and base64 encoding
 * - http:// and https:// URLs
 */
export const sanitizeImageSrc = (src?: string): string | null => {
	if (!src || typeof src !== 'string') {
		return null;
	}

	const trimmed = src.trim().toLowerCase();

	// Allow safe data URLs
	if (trimmed.startsWith('data:')) {
		const isSafe = SAFE_DATA_IMAGE_PREFIXES.some((prefix) =>
			trimmed.startsWith(prefix)
		);
		return isSafe ? src : null;
	}

	// Allow http(s) URLs
	if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
		try {
			// Basic validation: ensure it's a valid URL
			new URL(src);
			return src;
		} catch {
			return null;
		}
	}

	// Block blob: URLs and everything else
	return null;
};
