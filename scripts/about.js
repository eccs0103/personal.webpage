// @ts-ignore
/** @typedef {import("./structure.js")} */

"use strict";
try {
	const birthday = new Date(`2004-03-24 12:00`);

	const timeBirthday = (/** @type {HTMLTimeElement} */ (document.querySelector(`time.-birthday`)));
	timeBirthday.dateTime = birthday.toString();
	timeBirthday.innerText = `${birthday.toLocaleString(undefined, {
		year: `numeric`,
		month: `numeric`,
		day: `numeric`,
		hourCycle: `h24`,
		hour: `2-digit`,
		minute: `2-digit`,
	})}`;

	const spanAge = (/** @type {HTMLSpanElement} */ (document.querySelector(`span.-age`)));
	spanAge.innerText = `${Math.round((Date.now() - birthday.valueOf()) / 1000 / 60 / 60 / 24 / 365)} years`;
	setInterval(() => {
		spanAge.innerText = `${Math.round((Date.now() - birthday.valueOf()) / 1000 / 60 / 60 / 24 / 365)} years`;
	}, 1000);

} catch (exception) {
	Application.prevent(exception);
}