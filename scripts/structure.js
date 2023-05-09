// @ts-ignore
/** @typedef {import("./modules/archive")} */
// @ts-ignore
/** @typedef {import("./modules/application")} */

"use strict";
//#region Post
class Post {
	/**
	 * @param {String} title 
	 * @param {Date} date 
	 * @param {String} content 
	 * @param {Boolean} archived 
	 */
	constructor(title, date, content, archived = false) {
		this.#title = title;
		this.#date = date;
		this.#content = content;
		this.#archived = archived;
	}
	/** @type {String} */ #title;
	/** @readonly */ get title() {
		return this.#title;
	}
	/** @type {Date} */ #date;
	/** @readonly */ get date() {
		return this.#date;
	}
	/** @type {String} */ #content;
	/** @readonly */ get content() {
		return this.#content;
	}
	/** @type {Boolean} */ #archived;
	/** @readonly */ get archived() {
		return this.#archived;
	}
}
//#endregion
//#region Picture
class Picture {
	/**
	 * @param {String} path 
	 * @param {String} description 
	 * @param {Date} date 
	 * @param {Boolean} archived 
	 */
	constructor(path, description, date, archived = false) {
		this.#path = path;
		this.#description = description;
		this.#date = date;
		this.#archived = archived;
	}
	/** @type {String} */ #path;
	/** @readonly */ get path() {
		return this.#path;
	}
	/** @type {String} */ #description;
	/** @readonly */ get description() {
		return this.#description;
	}
	/** @type {Date} */ #date;
	/** @readonly */ get date() {
		return this.#date;
	}
	/** @type {Boolean} */ #archived;
	/** @readonly */ get archived() {
		return this.#archived;
	}
}
//#endregion