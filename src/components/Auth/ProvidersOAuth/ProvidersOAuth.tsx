import { useTranslation } from 'react-i18next';

import GitHubIcon from '@mui/icons-material/GitHub';
import { useSnackbar } from 'notistack';

import { OAuthProviders } from '@/models/auth';

import { authService, parseAuthError } from '@/services/auth/authService';

import GoogleIcon from '@/components/Common/UI/Icons/GoogleIcon/GoogleIcon';

import './ProvidersOAuth.css';

const ProvidersOAuth = () => {
	const { t } = useTranslation();
	const { enqueueSnackbar } = useSnackbar();

	const onAuthProvider = async (provider: OAuthProviders) => {
		try {
			const user = await authService.signInWithProvider(provider);
			if (!user) {
				throw new Error(`No user info received from provider: ${provider}`);
				return;
			}

			enqueueSnackbar(
				`Welcome, ${user.displayName}! Your email is: ${user.email}`,
				{ variant: 'success' },
			);
		} catch (error) {
			enqueueSnackbar(parseAuthError(error).message, {
				variant: 'error',
			});
		}
	};

	return (
		<div>
			<h2>{t('components.auth.providerAuth.title')}:</h2>
			<button
				className='provider-btn google'
				onClick={() => onAuthProvider(OAuthProviders.Google)}
			>
				<GoogleIcon />
				<span>{t('components.auth.providerAuth.buttons.google')}</span>
			</button>
			<button
				className='provider-btn github'
				onClick={() => onAuthProvider(OAuthProviders.GitHub)}
			>
				<GitHubIcon />
				<span>{t('components.auth.providerAuth.buttons.github')}</span>
			</button>
		</div>
	);
};

export default ProvidersOAuth;
