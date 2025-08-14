/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				'nutrisys-primary': {
					50: '#e7f3ea',
					100: '#cfe7d5',
					200: '#a3d2ad',
					300: '#76bd84',
					400: '#4aa95c',
					500: '#2e7d32', // base
					600: '#276b2b',
					700: '#205824',
					800: '#19461d',
					900: '#133517',
				},
				'nutrisys-secondary': {
					50: '#f3fbe8',
					100: '#e3f6c4',
					200: '#cdef8f',
					300: '#b4e05a',
					400: '#9bd132',
					500: '#7cb342', // base
					600: '#689936',
					700: '#537c2a',
					800: '#3f5f1f',
					900: '#2b4415',
				},
				'nutrisys-background': {
					50: '#ffffff',
					100: '#f9fcf7',
					200: '#f1f8e9', // base
					300: '#dfeeda',
					400: '#cde3c9',
					500: '#bad8b8',
					600: '#98b99a',
					700: '#769a7c',
					800: '#557c5f',
					900: '#375d43',
				},
				error: '#e53935',
			},
			fontFamily: {
				kodchasan: ['Kodchasan', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
