import type { Theme } from '@emotion/react';
import type { IconButtonProps, SxProps } from '@mui/material';

/**
 * Storing values that change depending on the fullscreen state
 * Example usage:
 *
 * const labels: FullscreenStateMap<string> = {
 *   enter: "Enter Fullscreen",
 *   exit: "Exit Fullscreen"
 * };
 *
 * const icons: FullscreenStateMap<JSX.Element> = {
 *   enter: <FaExpand />,
 *   exit: <FaCompress />
 * };
 */
export interface FullscreenStateMap<T> {
	enter: T;
	exit: T;
}

export interface FullscreenToggleProps extends IconButtonProps {
	/**
	 * Hides the fullscreen toggle button if the browser does not support fullscreen.
	 * If false or not provided, the button remains visible but disabled.
	 */
	isHideIfUnsupported?: boolean;
	labels?: FullscreenStateMap<string>;

	/**
	 * `iconSx` applies styles to the icon, including responsive sizes via breakpoints.
	 * When using `iconSx`, passing `size` is optional.
	 * You can also pass just `size` for a simple fixed icon size without styles.
	 *
	 * <FullscreenToggle
	 *   iconSx={{
	 *     fontSize: {
	 *       xs: 24,  // Phones 24px
	 *       sm: 30,  // Tablets 30px
	 *       md: '35px',  // Middle and Large screens
	 *     }
	 *   }}
	 * />
	 *
	 * <FullscreenToggle size={IconFontSize.large}/>
	 */
	iconSx?: SxProps<Theme>;
}
