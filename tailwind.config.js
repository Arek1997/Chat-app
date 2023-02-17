/** @type {import('tailwindcss').Config} */
module.exports = {
	plugins: [require('prettier-plugin-tailwindcss')],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		screens: {
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			'2xl': '1400px',
		},

		container: {
			center: true,
		},

		extend: {},
	},
	plugins: [],
};
