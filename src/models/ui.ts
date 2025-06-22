import type { Breakpoint } from '@mui/material';

export enum IconFontSize {
	inherit = 'inherit',
	small = 'small',
	medium = 'medium',
	large = 'large',
}

/**
 * Responsive values keyed by breakpoints (e.g., 'xs', 'sm', 'md'),
 * each with a value of type T.
 *
 * Examples:
 *    heights = { sx: 2, sm: 4, md: 6 }
 *    heights = { sx: '2px', sm: '4px', md: '6px' }
 */
export type ResponsiveValues<T> = Partial<Record<Breakpoint, T>>;
