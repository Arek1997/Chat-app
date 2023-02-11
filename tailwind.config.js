/** @type {import('tailwindcss').Config} */
module.exports = {
	plugins: [require('prettier-plugin-tailwindcss')],
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
