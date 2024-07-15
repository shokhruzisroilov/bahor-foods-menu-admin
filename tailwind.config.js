/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
			},
			fontFamily: {
				merriweather: ['Merriweather', 'serif'],
				cormorant: ['Cormorant', 'serif'],
			},
			boxShadow: {
				custom: '0px 9px 20px rgba(47, 71, 123, 0.09)',
			},
		},
	},
	plugins: [],
}
