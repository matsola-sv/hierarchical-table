import { useTranslation } from 'react-i18next';

import { Card, CardContent, Typography } from '@mui/material';

import type { Post } from '@/api/typicode/posts/types';

interface PostCardProps {
	post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
	const { t } = useTranslation();

	return (
		<Card>
			<CardContent>
				<Typography
					variant='h6'
					component='h2'
					gutterBottom
				>
					{post.title}
				</Typography>

				<Typography
					color='textSecondary'
					variant='body2'
					gutterBottom
				>
					{t('common:author')}: User {post.userId}
				</Typography>

				<Typography
					variant='body2'
					paragraph
				>
					{post.body}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default PostCard;
