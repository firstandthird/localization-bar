/* eslint-env browser */
import { addClass, findOne, on } from 'domassist';

/**
 * Class representing a language bar used to display a message to a user based on
 * their browser's preferred language.
 */
export default class {
  /**
   * Create a language bar
   * @param {Object} languageMap - options associated with each possible language
   * @param {string} [insertSelector=body] - selector for where to insert the bar
   * @param {string} [language=null] - override the browser's preferred language setting
   */
  constructor(languageMap, { insertSelector = 'body', language = null } = {}) {
    this.languageMap = languageMap;
    this.insertSelector = insertSelector;
    this.language = language;
  }

  /**
   * See if a browser preferred language matches a language option
   * @return {Object | Boolean} specific language options or false if no language is found
   */
  findLanguage() {
    const selectedLanguages = this.getLanguage();

    for (let i = 0; i < selectedLanguages.length; i += 1) {
      const selectedLanguage = selectedLanguages[i].toLowerCase();

      if (selectedLanguage in this.languageMap) {
        return this.languageMap[selectedLanguage];
      }
    }

    return false;
  }

  /**
   * Gets the languages.
   * @return [String]
   */
  getLanguage() {
    let language = this.language || navigator.languages || navigator.userLanguage;
    if (!Array.isArray(language)) {
      language = [language];
    }

    return language;
  }

  /**
   * Check to see the localization bar is needed. If it is create the HTML and add to page
   */
  check() {
    this.language = this.findLanguage();

    if (this.language) {
      this.addHtml();
    }
  }

  /**
   * Create all the HTML for the localization bar
   */
  addHtml() {
    this.createWrapper();
    this.addCopy();
    this.createCloseBtn();
  }

  createWrapper() {
    const bar = document.createElement('div');
    addClass(bar, 'localization-bar');

    if (this.insertSelector === 'body') {
      this.wrapper = document.body.insertBefore(bar, document.body.firstChild);
    } else {
      const insertionPoint = findOne(this.insertSelector);
      this.wrapper = insertionPoint.insertBefore(bar, insertionPoint.firstChild);
    }
  }

  createCloseBtn() {
    const button = document.createElement('button');
    addClass(button, 'localization-bar__close');
    button.setAttribute('aria-label', 'Close');
    button.innerHTML = '<span aria-hidden="true">X</span>';
    on(button, 'click', evt => {
      evt.preventDefault();
      this.close();
    });

    this.wrapper.appendChild(button);
  }

  close() {
    this.wrapper.style.marginTop = `-${this.wrapper.offsetHeight}px`;
  }

  addCopy() {
    const languageCta = document.createElement('a');
    addClass(languageCta, 'localization-bar__cta');
    languageCta.href = this.language.cta.url;
    languageCta.innerText = this.language.cta.text;
    this.wrapper.innerText = `${this.language.message} `;
    this.wrapper.appendChild(languageCta);
  }
}
