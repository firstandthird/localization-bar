import LanguageBar from '../localization-bar';

const languageMap = {
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
const localizationBar = new LanguageBar(languageMap, {
  language: 'es'
});
localizationBar.check();
