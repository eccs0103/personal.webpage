// @ts-ignore
/** @typedef {import("./structure.js")} */

"use strict";
try {
	//#region Database
	/** @type {Array<Post>} */ const database = [
		new Post(`Security`, new Date(`2023-04-06 00:57`), `
			Cybersecurity involves strategies, policies, and technology used to protect critical business systems and information against cyber threats such as cyberattacks and data breaches. As businesses have gone increasingly digital, cyberattacks have increased as malicious actors continue to become more sophisticated in how they attack businesses and their data.
		`),
		new Post(`Protection`, new Date(`2023-04-06 00:59`), `
			The importance of cybersecurity<br>
			The simplest explanation for the importance of cybersecurity can be summed up as follows: information drives business and businesses rely on technology. Cyber threats attack both. Cybersecurity practices aim to protect them.<br>
			The benefits, however, go much further. A good cybersecurity posture protects:<br>
			Financials: Downtime impacts revenue activity, reputation damage discourages new customers, fines for non-compliance can be costly, to name a few.<br>
			Reputation: Data breaches and downtime look bad and bad press negatively impacts customer perceptions.<br>
			Customers: Loss of customer data can have far-reaching effects on the lives and businesses of those you do business with.<br>
			Employees: A breach can result in employee data falling into the hands of cybercriminals.<br>
			Compliance: Businesses have a responsibility to protect customer, patient, client personal and business data, depending on their industry and regulatory compliance requirements.<br>
		`),
		new Post(`Technology security`, new Date(`2023-04-06 01:01`), `
			Information security, according to security training specialist the SANS Institute, refers to “the processes and methodologies which are designed and implemented to protect print, electronic, or any other form of confidential, private and sensitive information or data from unauthorized access, use, misuse, disclosure, destruction, modification, or disruption.” The reference to “print” and information or data is significant, since cybersecurity pertains solely to digital or electronic information or data.<br>
			<img src="../resources/storage/digital protection.jpg">
			Cybersecurity is “the practice of protecting systems, networks and programs from digital attacks,” according to high-tech giant Cisco. “These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.” PCmag simplifies the definition to: “the protection of data and systems in networks that are connected to the internet.”<br>
		`),
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
					h3Title.role = `button`;
					h3Title.style.fontSize = `revert`;
					h3Title.addEventListener(`click`, (event) => {
						navigator.clipboard.writeText(`${location.origin}${location.pathname}#${articlePost.id}`)
							.then(() => {
								Application.alert(`Link to post copied.`);
							})
							.catch((reason) => {
								Application.prevent(reason);
							});
					});
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
									dialog.classList.add(`layer`, `with-padding`, `flex`, `centered`);
									dialog.addEventListener(`click`, (event) => {
										if (dialog === event.target) {
											dialog.remove();
										}
									});
									dialog.showModal();
									{
										const imgPreview = dialog.appendChild(document.createElement(`img`));
										imgPreview.src = image.src;
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