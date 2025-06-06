import type {
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "ItsNooblk",
	subtitle: "DevOps Blog",
	lang: "en", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "https://softco.com/wp-content/uploads/2023/05/DevOps-Header-01.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/nooblk-98",
			external: true,
		},
		{
			name: "Portfolio",
			url: "https://me.itsnooblk.com", 
			external: true,
		},
	],
};


export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "Lahiru Sandaruwan Liyanage",
	bio: "A passionate DevOps Engineer from Sri Lanka",
	links: [
		{
			name: "facebook",
			icon: "fa6-brands:facebook", // Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://www.facebook.com/lahirubrown/",
		},
		{
			name: "whatsapp",
			icon: "fa6-brands:whatsapp",
			url: "https://wa.me/+94716172860",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/nooblk-98",
		},
				{
			name: "Linkedin",
			icon: "fa6-brands:linkedin",
			url: "https://www.linkedin.com/in/lahiru-sandaruwan-liyanage/",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "MIT License",
	url: "https://opensource.org/licenses/MIT",
};
