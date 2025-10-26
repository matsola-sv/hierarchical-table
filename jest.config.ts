import type { Config } from 'jest';

const config: Config = {
	rootDir: './',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.test.json' }],
	},
	moduleNameMapper: {
		// Allows importing files with '@/' as an alias for 'src'
		'^@/(.*)$': '<rootDir>/src/$1',

		// Mocks CSS imports to avoid errors during tests
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',

		// Mocks static asset imports (images, etc.)
		'\\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$': '<rootDir>/test/mocks/fileMock.js',
	},

	// Ignore generated and dependency folders when running tests
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};

export default config;
