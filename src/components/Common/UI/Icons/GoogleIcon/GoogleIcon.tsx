import type { FC } from 'react';

import { SvgIcon, type SvgIconProps } from '@mui/material';

const GoogleIcon: FC = (props: SvgIconProps) => (
	<SvgIcon
		{...props}
		viewBox='0 0 533.5 544.3'
	>
		<path
			fill='#4285F4'
			d='M533.5 278.4c0-17.4-1.4-34.2-4-50.4H272v95.4h146.9c-6.3 34-25 62.9-53.7 82.2v68h86.8c50.7-46.7 79.5-115.6 79.5-195.2z'
		/>
		<path
			fill='#34A853'
			d='M272 544.3c72.9 0 134.1-24.1 178.8-65.3l-86.8-68c-24.1 16.2-55 25.8-91.9 25.8-70.7 0-130.8-47.9-152.3-112.2H31v70.3c44.7 88.3 136.1 149.4 241 149.4z'
		/>
		<path
			fill='#FBBC05'
			d='M119.7 324.6c-10.9-32.4-10.9-67.6 0-100l-71.4-55.3H31c-39.3 77.5-39.3 169.7 0 247.2l88.7-69.9z'
		/>
		<path
			fill='#EA4335'
			d='M272 107.7c39.4 0 75 13.6 103 40.2l77.2-77.2C404.1 24.1 343 0 272 0 167 0 75.7 61 31 149.4l88.7 69.9c21.5-64.3 81.6-112.2 152.3-112.2z'
		/>
	</SvgIcon>
);

export default GoogleIcon;
