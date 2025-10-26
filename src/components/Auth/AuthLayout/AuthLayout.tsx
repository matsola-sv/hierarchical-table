import { type FC, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Divider, useMediaQuery, useTheme } from '@mui/material';

import PageTitle from '@/components/Common/UI/Pages/PageTitle';
import VerticalDivider from '@/components/Common/UI/VerticalDivider';

export interface AuthLayoutProps {
	left: ReactNode;
	right: ReactNode;
	title?: string;
	dividerText?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ title, left, right, dividerText }) => {
	const { t } = useTranslation();
	const theme = useTheme();
	const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const locDividerText = dividerText ?? t('components.auth.authLayout.or');

	return (
		<Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
			{title && <PageTitle>{title}</PageTitle>}

			<Box
				sx={{
					display: 'flex',
					flexDirection: isMobileOrTablet ? 'column' : 'row',
					bgcolor: 'background.paper',
					borderRadius: 1,
					boxShadow: 1,
					overflow: 'hidden',
					gap: isMobile ? 2 : 0,
					alignItems: isMobileOrTablet ? 'center' : 'stretch',
				}}
			>
				<Box sx={{ flex: 1, p: 3 }}>{left}</Box>

				{isMobileOrTablet ? (
					<Divider
						sx={{ width: '100%' }}
						textAlign='center'
					>
						{locDividerText}
					</Divider>
				) : (
					<VerticalDivider>{locDividerText}</VerticalDivider>
				)}

				<Box sx={{ flex: 1, p: 3 }}>{right}</Box>
			</Box>
		</Box>
	);
};

export default AuthLayout;
