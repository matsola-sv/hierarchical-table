import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { OAuthProviders } from '@/models/auth';

import { authService, parseAuthError } from '@/services/auth/authService';

import SocialMediaButton from '@/components/Common/UI/Buttons/SocialMediaButton/SocialMediaButton';
import GoogleIcon from '@/components/Common/UI/Icons/GoogleIcon/GoogleIcon';

export interface ProvidersOAuthProps {
	disabled?: boolean; // Disables all OAuth provider buttons
}

const ProvidersOAuth: FC<ProvidersOAuthProps> = ({ disabled = false }) => {
	const { t } = useTranslation();
	const { enqueueSnackbar } = useSnackbar();

	const onAuthProvider = async (provider: OAuthProviders) => {
		try {
			const user = await authService.signInWithProvider(provider);
			if (!user) {
				throw new Error(`No user info received from provider: ${provider}`);
				return;
			}
		} catch (error) {
			enqueueSnackbar(parseAuthError(error).message, {
				variant: 'error',
			});
		}
	};

	return (
		<Box sx={{ width: '100%', maxWidth: 300 }}>
			<Typography
				variant='h6'
				textAlign='center'
				mb={2}
				sx={{
					fontSize: { xs: '1.15rem', sm: '1.35rem' },
				}}
			>
				{t('components.auth.providerAuth.title')}:
			</Typography>
			<Stack
				spacing={2}
				alignItems='center'
			>
				<SocialMediaButton
					disabled={disabled}
					startIcon={<GoogleIcon />}
					onClick={() => onAuthProvider(OAuthProviders.Google)}
				>
					{t('components.auth.providerAuth.buttons.google')}
				</SocialMediaButton>

				<SocialMediaButton
					disabled={disabled}
					startIcon={<GitHubIcon />}
					onClick={() => onAuthProvider(OAuthProviders.GitHub)}
				>
					{t('components.auth.providerAuth.buttons.github')}
				</SocialMediaButton>
			</Stack>
		</Box>
	);
};

export default ProvidersOAuth;
