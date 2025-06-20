import { type FC, type ReactNode } from 'react';

import { Button, type ButtonProps } from '@mui/material';

interface SocialButtonProps extends ButtonProps {
	startIcon: ReactNode;
	children: ReactNode;
}

const SocialMediaButton: FC<SocialButtonProps> = ({ startIcon, children, ...rest }) => {
	return (
		<Button
			variant='outlined'
			startIcon={startIcon}
			fullWidth
			{...rest}
			sx={{ ...rest.sx }}
		>
			{children}
		</Button>
	);
};

export default SocialMediaButton;
