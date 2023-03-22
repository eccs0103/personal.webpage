"use strict";
try {
	//#region Database
	/** @type {Array<Post>} */ const database = [
		new Post(`Փորձնական ստուգում`, new Date(`2023-03-20 22:24`), `
			<ol>
				<li>Տեքստը նորմալ ա աշխատում։</li>
				<li>Համարակալումը նորմալ ա աշխատում։</li>
				<li><b>Ֆորմատը</b> <i>նորմալ</i> <u>ա</u> <s>աշխատում։</s></li>
				<li><a href="">Հղումները</a> նորմալ են աշխատում։</li>
				<li>Նկարները նորմալ են աշխատում</li>
			</ol>
		`),
		new Post(`Մի հատ էլ տորթ`, new Date(`2023-03-22 18:53`), `
			<img src="../resources/storage/cake.png">
		`)
	];
	//#endregion
	//#region Initialize
	const templatePostPreset = (/** @type {HTMLTemplateElement} */ (document.querySelector(`template#post-preset`)));
	const container = (() => {
		const result = templatePostPreset.parentElement;
		if (!result) {
			throw new ReferenceError(`Element 'container' isn't defined.`);
		}
		return result;
	})();

	/**
	 * @callback Filter
	 * @param {Post} post
	 * @param {Number} index
	 * @returns {Boolean}
	 */

	//#region Render
	/**
	 * @param {Array<Filter>} filters 
	 */
	function render(filters) {
		for (let index = database.length - 1; index >= 0; index--) {
			const post = database[index];
			if (filters.every(filter => filter(post, index))) {
				//#region Post
				const articlePost = container.appendChild((/** @type {HTMLElement} */ (/** @type {HTMLElement} */(templatePostPreset.content.querySelector(`article#post-`)).cloneNode(true))));
				articlePost.id = `post-${index}`;
				{
					//#region Post title
					const h3Title = (/** @type {HTMLHeadingElement} */ (articlePost.querySelector(`h3.-title`)));
					h3Title.innerText = post.title;
					{ }
					//#endregion
					//#region Post date
					const timeDate = (/** @type {HTMLTimeElement} */ (articlePost.querySelector(`time.-date`)));
					timeDate.dateTime = post.date.toString();
					timeDate.innerText = post.date.toLocaleString(undefined, {
						year: `numeric`,
						month: `numeric`,
						day: `numeric`,
						hourCycle: `h24`,
						hour: `2-digit`,
						minute: `2-digit`,
					});
					timeDate.role = `button`;
					timeDate.addEventListener(`click`, (event) => {
						navigator.clipboard.writeText(`${location.origin}${location.pathname}#${articlePost.id}`)
							.then(() => {
								Application.alert(`Ссылка к посту скопирована.`);
							})
							.catch((reason) => {
								Application.prevent(reason);
							});
					});
					{ }
					//#endregion
					//#region Post container
					const divContainer = (/** @type {HTMLDivElement} */ (articlePost.querySelector(`div.-container`)));
					{
						//#region Post content
						divContainer.innerHTML = post.content;
						{
							for (const image of divContainer.querySelectorAll(`img`)) {
								image.style.cursor = `pointer`;
								image.addEventListener(`click`, (event) => {
									//#region Preview
									const dialog = document.body.appendChild(document.createElement(`dialog`));
									dialog.classList.add(`layer`);
									dialog.style.display = `flex`;
									dialog.style.justifyContent = `center`;
									dialog.addEventListener(`click`, (event) => {
										if (dialog === event.target) {
											dialog.remove();
										}
									});
									dialog.showModal();
									{
										const imgPreview = dialog.appendChild(document.createElement(`img`));
										imgPreview.src = image.src;
										imgPreview.style.maxWidth = `100%`;
										imgPreview.style.maxHeight = `100%`;
										imgPreview.style.objectFit = `contain`;
									}
									//#endregion
								});
							}
						}
						//#endregion
					}
					//#endregion
				}
				//#endregion
			}
		}
	}
	//#endregion

	/** @type {Array<Filter>} */ const filters = [
		//#region Archive filter
		(post) => !post.archived,
		//#endregion
	];
	render(filters);
	//#endregion
} catch (exception) {
	Application.prevent(exception);
}