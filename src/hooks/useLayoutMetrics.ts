import type { SxProps, Theme } from '@mui/material';

import type { ResponsiveValues } from '@/models/ui';

import { FOOTER_HEIGHTS, HEADER_HEIGHTS } from '@/constants/layout';

type LayoutSizes = ResponsiveValues<number>;
type Heights = ResponsiveValues<string>;

export interface LayoutMetricsProps {
	/** If true, returns responsive header heights; otherwise all values will be '0px'. */
	header?: boolean;

	/** If true, returns responsive footer heights; otherwise all values will be '0px'. */
	footer?: boolean;
}

export interface LayoutMetrics {
	/** Styles for the page body. Used to apply height and padding based on header/footer sizes. */
	bodySx: SxProps<Theme>;

	/** Responsive pixel heights for header and footer. */
	heights: {
		header: Heights;
		footer: Heights;
	};
}

/**
 * Converts numeric sizes to strings with 'px' units or sets all values to '0px' if disabled.
 */
const formatHeights = (sizes: LayoutSizes, enabled: boolean): Heights => {
	const toPx = (num: number): string => `${num}px`;

	return Object.fromEntries(
		Object.entries(sizes).map(([key, val]) => [key, enabled ? toPx(val) : '0px']),
	) as Heights;
};

/**
 * Calculates responsive layout metrics for the page with optional header and footer.
 * Returns `sx` styles for the page content (`body`), accounting for responsive header and footer heights.
 * If header/footer are disabled, their heights will be '0px' for all breakpoints.
 */
const useLayoutMetrics = ({
	header = true,
	footer = true,
}: LayoutMetricsProps): LayoutMetrics => {
	const headerHeights = formatHeights(HEADER_HEIGHTS, header);
	const footerHeights = formatHeights(FOOTER_HEIGHTS, footer);
	const heights = { header: headerHeights, footer: footerHeights };

	const createCalcFn = (headerHeight?: string, footerHeight?: string) => {
		return `calc(100vh - ${headerHeight} - ${footerHeight})`;
	};

	const bodySx: SxProps<Theme> = {
		height: {
			xs: createCalcFn(headerHeights.xs, footerHeights.xs),
			sm: createCalcFn(headerHeights.sm, footerHeights.sm),
			md: createCalcFn(headerHeights.md, footerHeights.md),
		},
		paddingTop: headerHeights,
		paddingBottom: footerHeights,
		overflowY: 'auto',
	};

	return { bodySx, heights };
};

export default useLayoutMetrics;
