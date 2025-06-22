import type { FC } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import { Avatar } from '@mui/material';

interface UserAvatarProps {
	alt?: string;
	src?: string | null;
}

const UserAvatar: FC<UserAvatarProps> = ({ alt = '', src }) => {
	return (
		<Avatar
			alt={alt}
			src={src || undefined}
			sx={{
				width: { xs: 28, sm: 32, md: 36 },
				height: { xs: 28, sm: 32, md: 36 },
				fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
			}}
		>
			{!src && <PersonIcon fontSize='inherit' />}
		</Avatar>
	);
};

export default UserAvatar;
