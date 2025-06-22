import { type FC } from 'react';

import AppAsyncButton, {
	type AppAsyncBtnProps,
} from '@/components/Common/UI/Buttons/AppAsyncButton/AppAsyncButton';

const AppSubmitButton: FC<AppAsyncBtnProps> = ({ ...props }) => {
	return (
		<AppAsyncButton
			type='submit'
			fullWidth={true}
			sx={{ mt: 2, ...props.sx }}
			{...props}
		/>
	);
};

export default AppSubmitButton;
