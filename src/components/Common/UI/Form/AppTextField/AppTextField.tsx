import { type FC } from 'react';

import { TextField, type TextFieldProps } from '@mui/material';

export type AppTextFieldProps = TextFieldProps;

export const AppTextField: FC<AppTextFieldProps> = props => {
	return (
		<TextField
			fullWidth
			margin='normal'
			variant='outlined'
			slotProps={{
				inputLabel: { shrink: true },
			}}
			{...props}
		/>
	);
};

export default AppTextField;
