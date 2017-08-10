/* eslint-env browser */
import LocalizationBar from '../index';
import CookieMonster from '@firstandthird/cookie-monster';
import test from 'tape-rollup';

const langMap = {
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

const boostrap = function(options = {}) {
  if (options.rememberState !== false) {
    options.rememberState = true;
  }

  return new LocalizationBar(langMap, options);
};

const teardown = function() {
  document.body.innerHTML = '';
  CookieMonster.remove('localization-bar');
};

test('Instance should contain valid API', assert => {
  const lb = boostrap();
  assert.equal(typeof lb.check, 'function', 'Check function exists');
  assert.equal(typeof lb.close, 'function', 'Close function exists');
  assert.end();
});

test('Navigation bar should appear if the language match', assert => {
  const lb = boostrap();
  lb.getLanguage = () => ['es'];

  assert.equal(document.querySelector('.localization-bar'), null, 'Localization bar is not present');
  lb.check();
  const bar = document.querySelector('.localization-bar');
  const link = bar.querySelector('.localization-bar__cta');
  const button = bar.querySelector('.localization-bar__close');

  assert.ok(bar instanceof Element, 'Localization bar is present after check');
  assert.equal(bar.innerText, 'Ver el sitio en españolX', 'Contains correct text');
  assert.ok(link.href.indexOf('/es') > -1, 'Should contain link to localized version');
  assert.equal(link.innerText, 'español', 'Link\'s text should be CTA\'s one');
  assert.equal(button.getAttribute('aria-label'), 'Close', 'Button has right aria-label');
  assert.end();
  teardown();
});

test('Navigation bar should not appear if there isn\'t a match', assert => {
  const lb = boostrap();
  lb.getLanguage = () => ['ru'];

  assert.equal(document.querySelector('.localization-bar'), null, 'Localization bar is not present');
  lb.check();
  assert.equal(document.querySelector('.localization-bar'), null, 'Localization bar is not present after check');
  assert.end();
  teardown();
});

test('Should be possible to place the bar anywhere else but the body', assert => {
  const lb = boostrap({ insertSelector: '.container' });
  lb.getLanguage = () => ['es'];

  document.body.innerHTML = '<div class="container"></div>';
  assert.equal(document.body.childElementCount, 1, 'Just one element');
  lb.check();
  assert.equal(document.body.childElementCount, 1, 'Still just one element');
  const bar = document.querySelector('.localization-bar');
  assert.notEqual(bar.parentNode, document.body, 'Bar is not parent of body');
  assert.ok(bar.parentNode.classList.contains('container'), 'Bar should be inside of the container');
  assert.end();
  teardown();
});

test('Should be possible to make the whole bar a link', assert => {
  const lb = boostrap({ barAsLink: true });
  lb.getLanguage = () => ['es'];

  lb.check();

  const bar = document.querySelector('.localization-bar');
  const link = bar.querySelector('.localization-bar__cta');
  const button = bar.querySelector('.localization-bar__close');

  assert.ok(bar instanceof Element, 'Localization bar is present after check');
  assert.equal(bar.tagName, 'A', 'Bar should be an anchor');
  assert.ok(bar.href.indexOf('/es') > -1, 'Should contain link to localized version');
  assert.equal(bar.innerText, 'Ver el sitio en españolX', 'Contains correct text');
  assert.equal(link, null, 'Inner link should not exist');
  assert.equal(button.getAttribute('aria-label'), 'Close', 'Button has right aria-label');
  assert.end();

  teardown();
});

test('Navigation bar should be closable', assert => {
  const lb = boostrap();
  lb.getLanguage = () => ['es'];

  lb.check();
  const bar = document.querySelector('.localization-bar');
  const button = bar.querySelector('.localization-bar__close');
  assert.equal(bar.style.marginTop, '', 'Should not have margin top');
  button.click();
  assert.equal(bar.style.marginTop, '-32px', 'Should have margin top');
  assert.end();
  teardown();
});

test('Should be possible to force the language', assert => {
  const lb = boostrap({ language: 'fr', rememberState: false });

  lb.check();
  const bar = document.querySelector('.localization-bar');
  assert.equal(bar.innerText, 'Voir le site en françaisX', 'Contains correct text');
  assert.end();
  teardown();
});

test('Close should set a cookie if remembering state', assert => {
  const lb = boostrap({ rememberState: true });
  lb.getLanguage = () => ['es'];

  lb.check();
  const bar = document.querySelector('.localization-bar');
  const button = bar.querySelector('.localization-bar__close');
  button.click();
  assert.equal(CookieMonster.get('localization-bar'), 'true', 'Should have a cookie');
  assert.end();
  teardown();
});

test('Should be possible to use remember state so the bar does not appear if already closed', assert => {
  const lb = boostrap({ language: 'fr', rememberState: true });

  CookieMonster.set('localization-bar', 'true');

  lb.check();
  const bar = document.querySelector('.localization-bar');
  assert.equal(bar, null, 'Bar is not present');
  assert.end();
  teardown();
});
