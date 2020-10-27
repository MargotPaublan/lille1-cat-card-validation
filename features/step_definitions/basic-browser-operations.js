const puppeteer = require('puppeteer');

/**
 * @type import('puppeteer').Browser
 */
let browser;
/**
 * @type import('puppeteer').Page
 */
let currentPage;

const debugMode = !!process.env.DEBUG;

function getBrowser() {
  if (!browser) {
    return puppeteer.launch({
      slowMo: debugMode ? 100 : 0,
      headless: !debugMode,
      defaultViewport: {
        width: 1024,
        height: 768,
        deviceScaleFactor: 1
      }
    }).then(_browser => {
      browser = _browser;
      return browser;
    })
  }
  return Promise.resolve(browser);
}
function closeBrowser() {
  if(!browser) {
    return Promise.reject('Can not close browser because it is not initialiazed.');
  }
  return browser.close();
}
function getCurrentPage() {
  if(!browser) {
    return Promise.reject('Can not get current page because browser is not initialiazed.');
  }
  if (!currentPage) {
    return browser.newPage().then(page => {
      currentPage = page;
      return page;
    });
  }
  return Promise.resolve(currentPage);
}
function closeCurrentPage() {
  if (!currentPage) {
    return Promise.reject('Can not close current page because it is not initialiazed.');
  }
  return currentPage.close().then(() => currentPage = null);
}

/**
 * 
 * @param {string} url 
 */
function goTo(url) {
  return currentPage.goto(url);
}

/**
 * 
 * @param {string} selector 
 */
function getElement(selector) {
  return waitFor(selector)
    .then(selector => currentPage.$(selector));
}
/**
 * 
 * @param {string} selector 
 */
function getElements(selector) {
  return waitFor(selector)
    .then(selector => currentPage.$$(selector));
}
/**
 * 
 * @param {string} selector 
 */
function isElementVisible(selector) {
  return getElement(selector)
    .then(() => true)
    .catch(() => false);
}
/**
 * 
 * @param {string} selector 
 */
function getTextContent(selector) {
  return getElement(selector)
    .then(element => element.getProperty('textContent'))
    .then(textContent => textContent.jsonValue());
}
/**
 * 
 * @param {string} selector 
 */
function getInputValue(selector) {
  return getElement(selector)
    .then(element => element.getProperty('value'))
    .then(textContent => textContent.jsonValue());
}
/**
 * 
 * @param {string} selector
 * @param {string} text
 */
function fillInput(selector, text) {
  return getElement(selector)
    .then(element => element.evaluate(node => node.value = '').then(() => element))
    .then(element => element.type(text, { delay: 50 }))
}
/**
 * 
 * @param {string} selector 
 */
function clickOn(selector) {
  return getElement(selector).then(element => element.click());
}
/**
 * 
 * @param {string} selector 
 */
function mouseHover(selector) {
  return waitFor(selector)
    .then(selector => currentPage.hover(selector));
}

/**
 * 
 * @param {string?} selector 
 */
function waitFor(selector) {
  return currentPage.waitForSelector(selector, { timeout: 3000, visible: true })
    .then(() => selector);
}
/**
 * 
 * @param {number} delay the delay to wait for in milliseconds
 */
function wait(delay) {
  return currentPage.waitForTimeout(delay);
}

module.exports = {
  getBrowser,
  closeBrowser,
  getCurrentPage,
  closeCurrentPage,
  goTo,
  getElement,
  getElements,
  isElementVisible,
  getTextContent,
  getInputValue,
  clickOn,
  mouseHover,
  fillInput,
  wait
};