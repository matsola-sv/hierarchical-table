import { type FC } from 'react';

import { Button, type ButtonProps, CircularProgress } from '@mui/material';

export interface AppAsyncBtnProps extends ButtonProps {
	loading?: boolean;
	progressSize?: number;
}

const AppAsyncButton: FC<AppAsyncBtnProps> = ({
	children,
	disabled,
	loading = false,
	progressSize = 18,
	...props
}) => {
	return (
		<Button
			variant='contained'
			color='primary'
			type='submit'
			disabled={disabled || loading}
			{...props}
		>
			{loading && (
				<CircularProgress
					size={progressSize}
					color='inherit'
					sx={{ mr: 1 }}
				/>
			)}
			{children}
		</Button>
	);
};

export default AppAsyncButton;
