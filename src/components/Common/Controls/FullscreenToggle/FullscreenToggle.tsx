import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { IconButton, Tooltip } from '@mui/material';

// Models
import { type FullscreenToggleProps } from '@/components/Common/Controls/FullscreenToggle/FullscreenToggle.types';
import { IconFontSize } from '@/models/ui';

// Hooks
import useFullscreen from '@/hooks/fullscreen/useFullscreen';

const FullscreenToggle: FC<FullscreenToggleProps> = iconProps => {
	const { t } = useTranslation();
	const { isFullscreen, toggleFullscreen, isFullscreenSupported } = useFullscreen();

	// Collect all other props in `...rest` to forward them unchanged
	const {
		iconSx,
		disabled = false,
		size = IconFontSize.medium,
		isHideIfUnsupported = false,
		labels = {
			enter: t('components.common.controls.fullscreenToggle.labels.enter'),
			exit: t('components.common.controls.fullscreenToggle.labels.exit'),
		},
		...rest
	} = iconProps;

	if (isHideIfUnsupported && !isFullscreenSupported) {
		return null;
	}

	const label = isFullscreen ? labels.exit : labels.enter;

	return (
		<Tooltip title={label}>
			<IconButton
				color='primary'
				aria-label={label}
				onClick={toggleFullscreen}
				disabled={disabled}
				{...rest} // All other props not used explicitly in iconProps
			>
				{isFullscreen ? (
					<FullscreenExitIcon
						fontSize={size}
						sx={iconSx}
					/>
				) : (
					<FullscreenIcon
						fontSize={size}
						sx={iconSx}
					/>
				)}
			</IconButton>
		</Tooltip>
	);
};
export default FullscreenToggle;
