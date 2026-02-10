import { useTranslation } from 'react-i18next';

import { usePosts } from '@/api/typicode/posts/postsHooks';
import { Alert, Box, Container, Stack, Typography } from '@mui/material';

import EmptyState from '@/components/Common/EmptyState';
import OverlaySpinner from '@/components/Common/UI/Spinners/OverlaySpinner';
import { PostCard } from '@/components/Posts';

export const PostsList = () => {
	const { t } = useTranslation();
	const { data: posts, isLoading, isError, error } = usePosts();

	if (isLoading) {
		return <OverlaySpinner />;
	}

	if (isError) {
		return (
			<Alert severity='error'>
				{error instanceof Error ? error.message : t('common:unknownError')}
			</Alert>
		);
	}

	if (!posts || posts.length === 0) {
		return <EmptyState message={t('common:noData')} />;
	}

	return (
		<Container maxWidth='md'>
			<Box py={4}>
				<Typography
					variant='h4'
					component='h1'
					gutterBottom
				>
					Posts
				</Typography>

				<Stack spacing={2}>
					{posts.map(post => (
						<PostCard
							key={post.id}
							post={post}
						/>
					))}
				</Stack>
			</Box>
		</Container>
	);
};

export default PostsList;
