// here is a version that is a es6 class
class LanguageBar {
  constructor(languageMap) {
    this.languageMap = languageMap;
    this.wrapper = document.querySelector('.language-bar');
    this.language = this.findLanguage();
    this.addCopy();
    this.createCloseBtn();
  }
  createCloseBtn() {
    const button = document.createElement('button');
    button.classList.add('language-bar__close');
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
  findLanguage() {
    const selectedLanguages = navigator.languages || [navigator.userLanguage];
    for (let i = 0; i < selectedLanguages.length; i += 1) {
      const selectedLanguage = selectedLanguages[i].toLowerCase();
      if (selectedLanguage in this.languageMap) {
        return this.languageMap[selectedLanguage];
      }
    }
    return this.languageMap['en-us'];
  }
  addCopy() {
    const languageCta = document.createElement('a');
    languageCta.classList.add('language-bar__cta');
    languageCta.href = this.language.cta.url;
    languageCta.innerText = this.language.cta.text;
    this.wrapper.innerText = `${this.language.message} `;
    this.wrapper.appendChild(languageCta);
  }
}

// also a version that can be an export
// const languageBar = (languageMap) => {
//   const selectedLanguages = navigator.languages || [navigator.userLanguage];
//   let language = '';
//   for (let i = 0; i < selectedLanguages.length; i += 1) {
//     const selectedLanguage = selectedLanguages[i].toLowerCase();
//     if (selectedLanguage in languageMap) {
//       language = languageMap[selectedLanguage];
//       break;
//     }
//   }
//   const languageBar = document.querySelector('.language-bar');
//   const languageCta = document.createElement('a');
//   languageCta.classList.add('language-bar__cta');
//   languageCta.href = language.cta.url;
//   languageCta.innerText = language.cta.text;
//   languageBar.innerText = `${language.message} `;
//   languageBar.appendChild(languageCta);
// };
const languageMap = {
  'en-us': {
    message: 'View the site in',
    cta: {
      text: 'english',
      url: '/en'
    }
  },
  es: {
    message: 'Ver el sitio en',
    cta: {
      text: 'español',
      url: '/es'
    }
  },
  fr: {
    message: 'Voir le site en',
    cta: {
      text: 'français',
      url: '/fr'
    }
  },
};
// languageBar(languageMap);
new LanguageBar(languageMap);
