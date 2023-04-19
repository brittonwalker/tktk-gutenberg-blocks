/** @type {import('tailwindcss').Config} */

const componentClassesPlugin = require("tailwind-component-classes");

module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		fontFamily: {
			heading: "var(--wp--custom--font--heading)",
			body: "var(--wp--custom--font--body)",
		},
		fontSize: {
			"heading-1": [
				"var(--wp--custom--font-size--heading-1)",
				"var(--wp--custom--line-height--heading-1)",
			],
			"body-1": [
				"var(--wp--custom--font-size--body-1)",
				"var(--wp--custom--line-height--body-1)",
			],
		},
		extend: {
			colors: {
				gold: "#C29832",
			},
		},
	},
	plugins: [componentClassesPlugin],
	components: {
		content:
			"w-[2000px] mx-auto max-w-[calc(100%_-_18px)] lg:max-w-[calc(100%_-_48px)]",
		heading: {
			h1: `text-heading-1 font-heading tracking-[var(--wp--custom--letter-spacing--heading-1)]`,
		},
		body: {
			1: `text-body-1 font-body tracking-[var(--wp--custom--letter-spacing--body-1)]`,
		},
	},
};
