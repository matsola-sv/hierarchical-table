import { type FC, useEffect, useMemo, useState } from 'react';

import {
	Input,
	MenuItem,
	Select,
	type SelectChangeEvent,
	useMediaQuery,
	useTheme,
} from '@mui/material';

import { AppLanguage } from '@/models/language';

import { languageService } from '@/services/languageService';

const LangSwitcher: FC = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [language, setLanguage] = useState<AppLanguage>(languageService.getCurrent());

	// Memoize once, because getLanguages creates a new array
	const languages = useMemo(() => languageService.getLanguages(), []);

	// Sync state with language changes from outside the component
	useEffect(() => {
		const handleLangChange = (lng: AppLanguage): void => {
			setLanguage(lng);
		};
		languageService.onChange(handleLangChange);

		return () => {
			languageService.offChange(handleLangChange);
		};
	}, []);

	useEffect(() => {
		setLanguage(languageService.getCurrent());
	}, []);

	const handleChange = async (event: SelectChangeEvent) => {
		const selectedLang = event.target.value as AppLanguage;
		try {
			await languageService.changeLanguage(selectedLang);
			setLanguage(selectedLang);
		} catch (error) {
			console.error('Error changing language:', error);
		}
	};

	return (
		<Select
			size={isMobile ? 'small' : 'medium'}
			value={language}
			onChange={handleChange}
			variant='outlined'
			input={<Input disableUnderline />}
			sx={{
				minWidth: 60,
				fontSize: isMobile ? '0.75rem' : '0.875rem',
				'& .MuiSelect-select': {
					paddingY: 0.25,
					paddingX: 1,
				},
			}}
		>
			{languages.map(lng => (
				<MenuItem
					key={lng}
					value={lng}
				>
					<span>{languageService.getLanguageMeta(lng).flag}</span>
				</MenuItem>
			))}
		</Select>
	);
};

export default LangSwitcher;
