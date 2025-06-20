import { type FC } from 'react';

import { Button, type ButtonProps, CircularProgress } from '@mui/material';

export interface AppSubmitBtnProps extends ButtonProps {
	loading?: boolean;
	progressSize?: number;
}

const AppSubmitButton: FC<AppSubmitBtnProps> = ({
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
			fullWidth
			sx={{ mt: 2 }}
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

export default AppSubmitButton;
