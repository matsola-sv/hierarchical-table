import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage: FC = () => {
	const { t } = useTranslation();

	return (
		<div className='page-not-found'>
			<h1>:( {t('pages.notFound.message')}</h1>
			<br />
		</div>
	);
};
export default NotFoundPage;
