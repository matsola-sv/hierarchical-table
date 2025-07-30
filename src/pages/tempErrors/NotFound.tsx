import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import EmptyState from '@/components/Common/EmptyState/EmptyState';

const NotFoundPage: FC = () => {
	const { t } = useTranslation();

	return (
		<Box sx={{ height: '100%' }}>
			<EmptyState message={t('pages.notFound.message')} />
		</Box>
	);
};
export default NotFoundPage;
