import type { WebApp } from '@grammyjs/web-app';
import { browser } from '$app/environment';

export async function getWebApp(): Promise<WebApp | null> {
	let webApp: null | WebApp = null;

	console.log('browser', browser);
	if (browser) {
		console.log('window.Telegram', window.Telegram);
		try {
			webApp = await import('@grammyjs/web-app').then((module) => module.WebApp);
		} catch (e) {
			console.log('Expected error', e);
		}
	}

	return webApp;
}
