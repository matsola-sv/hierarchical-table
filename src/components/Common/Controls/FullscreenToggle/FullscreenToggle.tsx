import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation();
	const {
		isDisabled = false,
		isHideIfUnsupported = false,
		iconSize = IconFontSize.medium,
		labels = {
			enter: t('components.common.controls.fullscreenToggle.labels.enter'),
			exit: t('components.common.controls.fullscreenToggle.labels.exit'),
		},
	} = props;

	const { isFullscreen, toggleFullscreen, isFullscreenSupported } = useFullscreen();

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
