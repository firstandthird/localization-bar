# Localization Bar

Detect a user's browser language and show a message for the user to view pages in their preferred language.

## Usage

Import the class into your javascript. You'll then need to pass an object containing the options for the languages you want to use. Each language needs the following options.

* message - the copy shown in the bar
* cta - an object that contains
    * text - text displayed for the cta
    * url - url to the translated pages
    
Here is an example of what the object would look like.

```javascript
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
  }
};
```

By default the localization-bar will be appended to the top of the body element. If you would rather insert the bar into another part of the page, simply pass the selector of the element you want to insert before.

You can also override the browser's preferred language setting and pass a preferred language as an parameter when instantiating the class.

When you are ready to add the bar to the page call the `check()` method.

Example:

```javascript
const localizationBar = new LanguageBar({
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
    }
}, {
    insertSelector: '.wrapper',
    language: 'es'
});
localizationBar.check();
```
