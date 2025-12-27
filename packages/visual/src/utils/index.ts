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
