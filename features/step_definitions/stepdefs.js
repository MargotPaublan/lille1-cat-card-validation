const { resolve, join } = require('path');
const { existsSync, mkdir } = require('fs');
const {
  Given,
  When,
  AfterAll,
  BeforeAll,
  After,
  Status,
} = require('@cucumber/cucumber');
const {
  getBrowser,
  closeBrowser,
  getCurrentPage,
  closeCurrentPage,
  goTo,
} = require('./basic-browser-operations');

const baseUrl = process.env.APPLICATION_BASE_URL || 'http://localhost:8000';

BeforeAll(getBrowser);
AfterAll(closeBrowser);
After(scenario => {
  if (scenario.result.status === Status.FAILED) {
    const screenshotsPath = resolve('.', 'screenshots');
    let screenshotsDirectoryPromise = Promise.resolve();
    if (!existsSync(screenshotsPath)) {
      screenshotsDirectoryPromise = new Promise((_resolve, _reject) => {
        mkdir(screenshotsPath, err => {
          if (err) {
            _reject(err);
          } else {
            _resolve();
          }
        });
      });
    }
    return screenshotsDirectoryPromise.then(() => getCurrentPage())
      .then(currentPage => currentPage.screenshot({
          path: join(screenshotsPath, `${new Date().getTime()}-${scenario.pickle.name}.png`),
          fullPage: true
        })).then(closeCurrentPage);
  }
  return closeCurrentPage();
});

Given(
  'A browser is open',
  getCurrentPage
);

When(
  'I go to {string} path of the application',
  wantedPath => goTo(`${baseUrl}${wantedPath}`)
);
