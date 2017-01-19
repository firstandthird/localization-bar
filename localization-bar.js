/* eslint-env browser */
export default class {
  constructor(languageMap, insertSelector = 'body') {
    this.languageMap = languageMap;
    this.insertSelector = insertSelector;
  }

  /**
   * See if a browser preferred language matches a language option
   * @returns {Object | Boolean} specific language options or false if no language is found
   */
  findLanguage() {
    const selectedLanguages = navigator.languages || [navigator.userLanguage];
    for (let i = 0; i < selectedLanguages.length; i += 1) {
      const selectedLanguage = selectedLanguages[i].toLowerCase();
      if (selectedLanguage in this.languageMap) {
        return this.languageMap[selectedLanguage];
      }
    }
    return false;
  }

  /**
   * Check to see the localization bar is needed. If it is create the HTML and add to page
   */
  check() {
    this.language = this.findLanguage();
    console.log(this.language);
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
    bar.classList.add('localization-bar');
    if (this.insertSelector === 'body') {
      this.wrapper = document.body.insertBefore(bar, document.body.firstChild);
    } else {
      const insertionPoint = document.querySelector(this.insertSelector);
      this.wrapper = insertionPoint.insertBefore(bar, insertionPoint.firstChild);
    }
  }

  createCloseBtn() {
    const button = document.createElement('button');
    button.classList.add('localization-bar__close');
    button.innerText = 'X';
    button.addEventListener('click', (evt) => {
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
    languageCta.classList.add('localization-bar__cta');
    languageCta.href = this.language.cta.url;
    languageCta.innerText = this.language.cta.text;
    this.wrapper.innerText = `${this.language.message} `;
    this.wrapper.appendChild(languageCta);
  }
}
