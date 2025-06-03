import { type FC } from 'react';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
// MUI
import { IconButton, Tooltip } from '@mui/material';

import { type FullscreenToggleProps } from '@/components/Common/Controls/FullscreenToggle/FullscreenToggle.types';
// Models
import { IconFontSize } from '@/models/ui';

// Hooks
import useFullscreen from '@/hooks/fullscreen/useFullscreen';

const FullscreenToggle: FC<FullscreenToggleProps> = props => {
	const {
		isDisabled = false,
		isHideIfUnsupported = false,
		iconSize = IconFontSize.medium,
		labels = {
			enter: 'Full screen',
			exit: 'Exit full screen',
		},
	} = props;

	const { isFullscreen, toggleFullscreen, isFullscreenSupported } = useFullscreen();

	if (isHideIfUnsupported && !isFullscreenSupported) {
		return null;
	}

	return (
		<Tooltip title={labels.enter}>
			<IconButton
				color='primary'
				aria-label={isFullscreen ? labels.exit : labels.enter}
				onClick={toggleFullscreen}
				disabled={isDisabled}
			>
				{isFullscreen ? (
					<FullscreenExitIcon fontSize={iconSize} />
				) : (
					<FullscreenIcon fontSize={iconSize} />
				)}
			</IconButton>
		</Tooltip>
	);
};
export default FullscreenToggle;
