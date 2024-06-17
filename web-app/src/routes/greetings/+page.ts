import { browser } from '$app/environment';
import { getWebApp } from '$lib/shared/libs/telegram/getWebApp';
import { error } from '@sveltejs/kit';
import { applyAction } from '$app/forms';
//
export async function load({ params }) {
	let webAppPromise = getWebApp();

	const webApp = await webAppPromise;

	// todo add validation https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
	if (!webApp || !webApp.initData) {
		error(404, 'Only from telegram web-app');
	}

	return {
		webApp
	};
}
