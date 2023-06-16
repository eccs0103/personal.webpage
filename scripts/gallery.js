// @ts-ignore
/** @typedef {import("./structure.js")} */
// @ts-ignore
/** @typedef {import("./modules/color.js")} */

"use strict";
try {
	//#region Gallery
	/** @type {Array<Picture>} */ const gallery = [
		new Picture(`../resources/storage/image-1.png`, `
			𝔸𝕝𝕨𝕒𝕪𝕤 𝔹𝕖𝕝𝕚𝕖𝕧𝕖 𝕥𝕙𝕒𝕥 𝕤𝕠𝕞𝕖𝕥𝕙𝕚𝕟𝕘 𝕨𝕠𝕟𝕕𝕖𝕣𝕗𝕦𝕝 𝕚𝕤 𝕒𝕓𝕠𝕦𝕥 𝕥𝕠 𝕙𝕒𝕡𝕡𝕖𝕟🤍🙏🏻🕊.
		`, new Date(`2023-03-21 23:33`)),
		new Picture(`../resources/storage/image-2.png`, `
			Last Bell🛎 🤍🎊
		`, new Date(`2023-03-21 23:37`)),
		new Picture(`../resources/storage/image-3.png`, `
			💙🦋
		`, new Date(`2023-03-21 23:37`)),
		new Picture(`../resources/storage/image-4.png`, `
			🤎✨
		`, new Date(`2023-03-21 23:38`)),
		new Picture(`../resources/storage/image-5.png`, `
			5c08💙🦋
		`, new Date(`2023-03-21 23:42`)),
	];
	//#endregion
	//#region Initialize
	const templatePicturePreset = (/** @type {HTMLTemplateElement} */ (document.querySelector(`template#picture-preset`)));
	const container = (() => {
		const result = templatePicturePreset.parentElement;
		if (!result) {
			throw new ReferenceError(`Element 'container' isn't defined.`);
		}
		return result;
	})();
	
	const color = (() => {
		const result = Color.tryParse(getComputedStyle(document.documentElement).getPropertyValue(`--color-shadow`));
		if (!result) {
			throw new ReferenceError(`Can't reach '--color-shadow' property.`);
		}
		result.alpha = 0.25;
		return result.toString(ColorFormat.RGB, true);
	})();

	//#region Preview
	/**
	 * @param {Number} index 
	 */
	function preview(index) {
		const picture = gallery[index];
		if (picture === undefined) {
			throw new ReferenceError(`Picture with ${index} index isn't defined.`);
		}
		const dialog = document.body.appendChild(document.createElement(`dialog`));
		dialog.classList.add(`layer`, `with-padding`, `flex`);
		dialog.addEventListener(`click`, (event) => {
			if (dialog === event.target) {
				dialog.remove();
			}
		});
		dialog.showModal();
		{
			const imgPreview = dialog.appendChild(document.createElement(`img`));
			imgPreview.src = picture.path;
			{ }
			const description = dialog.appendChild(document.createElement(`span`));
			description.classList.add(`depth`, `rounded`, `with-padding`);
			description.style.position = `absolute`;
			description.style.inset = `auto var(--size-large-gap) var(--size-large-gap) var(--size-large-gap)`;
			description.style.pointerEvents = `none`;
			description.innerText = picture.description.trim();
			{ }
			const divActions = dialog.appendChild(document.createElement(`div`));
			divActions.style.position = `absolute`;
			divActions.style.inset = `0`;
			divActions.style.display = `grid`;
			divActions.style.grid = `'left-button -1- right-button' / 1fr 4fr 1fr`;
			{
				const buttonLeft = divActions.appendChild(document.createElement(`button`));
				buttonLeft.style.gridArea = `left-button`;
				buttonLeft.style.backgroundColor = color;
				const left = gallery[index + 1];
				const leftExists = (left !== undefined);
				buttonLeft.hidden = !leftExists;
				buttonLeft.addEventListener(`click`, (event) => {
					if (leftExists) {
						preview(index + 1);
						dialog.remove();
					}
				});
				{
					const imgIcon = buttonLeft.appendChild(document.createElement(`img`));
					imgIcon.classList.add(`icon`);
					imgIcon.src = `../resources/left.png`;
				}
				const buttonRight = divActions.appendChild(document.createElement(`button`));
				buttonRight.style.gridArea = `right-button`;
				buttonRight.style.backgroundColor = color;
				const right = gallery[index - 1];
				const rightExists = (right !== undefined);
				buttonRight.hidden = !rightExists;
				buttonRight.addEventListener(`click`, (event) => {
					if (rightExists) {
						preview(index - 1);
						dialog.remove();
					}
				});
				{
					const imgIcon = buttonRight.appendChild(document.createElement(`img`));
					imgIcon.classList.add(`icon`);
					imgIcon.src = `../resources/right.png`;
				}
			}
		}
	}
	//#endregion
	
	/**
	 * @callback Filter
	 * @param {Picture} picture
	 * @param {Number} index
	 * @returns {Boolean}
	 */
	
	//#region Render
	/**
	 * @param {Array<Filter>} filters 
	 */
	function render(filters) {
		for (let index = gallery.length - 1; index >= 0; index--) {
			const picture = gallery[index];
			if (filters.every(filter => filter(picture, index))) {
				//#region Picture
				const picturePicture = container.appendChild((/** @type {HTMLPictureElement} */ (/** @type {HTMLPictureElement} */(templatePicturePreset.content.querySelector(`picture#picture-`)).cloneNode(true))));
				picturePicture.id = `picture-${index}`;
				picturePicture.addEventListener(`click`, (event) => {
					preview(index);
				});
				{
					//#region Image
					const image = (/** @type {HTMLImageElement} */ (picturePicture.querySelector(`img`)));
					image.src = picture.path;
					//#endregion
				}
				//#endregion
			}
		}
	}
	//#endregion

	/** @type {Array<Filter>} */ const filters = [
		//#region Archive filter
		(picture) => !picture.archived,
		//#endregion
	];
	render(filters);

	const matches = /#picture-(\d+)/.exec(location.hash);
	if (matches) {
		const [, index] = matches.map((item) => Number.parseInt(item));
		preview(index);
	}
	//#endregion
} catch (exception) {
	Application.prevent(exception);
}