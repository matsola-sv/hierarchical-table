import type { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import App from '@/components/Core/App';

// Mock AppRouter to simplify testing
jest.mock('@/components/Core/Router/AppRouter', () => {
	return function MockAppRouter() {
		return <div data-testid='app-router'>App Router Content</div>;
	};
});

// Mock SnackbarProvider to avoid MUI internals in test
jest.mock('notistack', () => {
	return {
		SnackbarProvider: ({ children }: { children: ReactNode }) => (
			<div data-testid='snackbar-provider'>{children}</div>
		),
	};
});

// Optionally mock MUI Box if needed (not mandatory)
jest.mock('@mui/material', () => {
	const original = jest.requireActual('@mui/material');
	return {
		...original,
		Box: ({ children, ...props }: { children: ReactNode; [key: string]: any }) => (
			<div {...props}>{children}</div>
		),
	};
});

describe('App Component', () => {
	const renderApp = () => render(<App />);

	const getAppElement = () => document.querySelector('.App') as HTMLElement;
	const getAppRouter = () => screen.getByTestId('app-router');
	const getSnackbarProvider = () => screen.getByTestId('snackbar-provider');

	test('renders without crashing', () => {
		renderApp();
		expect(getSnackbarProvider()).toBeInTheDocument();
	});

	test('renders main App container', () => {
		renderApp();
		const appContainer = getAppElement();
		expect(appContainer).toBeInTheDocument();
		expect(appContainer).toHaveClass('App');
	});

	test('renders AppRouter inside App', () => {
		renderApp();
		const appContainer = getAppElement();
		const appRouter = getAppRouter();
		expect(appContainer).toContainElement(appRouter);
		expect(screen.getByText('App Router Content')).toBeInTheDocument();
	});

	test('SnackbarProvider wraps App', () => {
		renderApp();
		const snackbar = getSnackbarProvider();
		const appContainer = getAppElement();
		expect(snackbar).toContainElement(appContainer);
	});
});
