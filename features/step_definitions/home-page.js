const { When, Then, defineParameterType } = require('@cucumber/cucumber');
const { expect } = require('chai');
const {
  mouseHover,
  isElementVisible,
  getElements,
  getTextContent,
  clickOn,
  wait
} = require('./basic-browser-operations');

defineParameterType({
  name: 'cardSide',
  regexp: /front|back/,
  transformer: s => s
});

When(
  'I put the mouse hover the last card',
  () => mouseHover('.card-group > .flipper:last-child')
);

When(
  'I click on the creation button',
  () => clickOn('.btn.circle.add')
);

When(
  'I click on the edit button',
  () => wait(650)
    .then(() => clickOn('.card-group > .flipper:last-child > .card.back > .card-footer > .btn'))
    .then(() => wait(500))
);

Then(
  'I should see the home page header',
  () => Promise.all([
      isElementVisible('header'),
      isElementVisible('header > h1'),
      isElementVisible('header > .btn')
    ])
    .then(areElementsVisible => {
      const [ isHeaderVisible, isTitleVisible, isBackButtonVisible ] = areElementsVisible;
      expect(isHeaderVisible).to.equal(true);
      expect(isTitleVisible).to.equal(true);
      expect(isBackButtonVisible).to.equal(false);
    })
);

Then(
  'I should see the card list content with {int} cat card(s)',
  expectedCardNumber => getElements('.card-group > .flipper')
    .then(cardElements => expect(cardElements).to.have.lengthOf(expectedCardNumber))
);

Then(
  'I should see the creation button',
  () => isElementVisible('.btn.circle.add')
    .then(isButtonVisible => expect(isButtonVisible).to.equal(true))
);

Then(
  'I should see the application\'s footer',
  () => isElementVisible('footer').then(isFooterVisible => expect(isFooterVisible).to.equal(true))
);

Then(
  'It should contains current copyright informations',
  () => Promise.all([
      isElementVisible('footer > .container > .fa-copyright'),
      getTextContent('footer > .container > label'),
      getTextContent('footer > .container > .infos')
    ]).then(footerElements => {
      const [ isCopyrightIconVisible, currentYear, legalInformations ] = footerElements;
      expect(isCopyrightIconVisible).to.equal(true);
      expect(currentYear).to.equal(`${new Date().getFullYear()} - Lille 1`);
      expect(legalInformations).to.equal('No cat has been hurt during the development of this app.');
    })
);

Then(
  'I should see a(n) {word}( of cat) in the last card {cardSide} content',
  (expectedElement, cardSide) => {
    let elementCssPath;
    switch (expectedElement) {
      case 'image':
        elementCssPath = '.card-img-top';
        break;
      case 'title':
        let cardTitleCssClass = '.card-title'
        if (cardSide === 'back') {
          cardTitleCssClass = '.card-subtitle'
        }
        elementCssPath = `.card-body > ${cardTitleCssClass}`;
        break;
      case 'description':
        elementCssPath = '.card-body > .card-text';
        break;
      case 'button':
        elementCssPath = '.card-footer > .btn';
        break;
      default:
        elementCssPath = '.do-not-exists'
        break;
    }

    return isElementVisible(`.card-group > .flipper:last-child > .card.${cardSide} > ${elementCssPath}`)
      .then(isVisible => expect(isVisible).to.equal(true));
  }
);

Then(
  'I should see the last card flip to show its back',
  () => isElementVisible('.card-group > .flipper:last-child > .card.back')
    .then(isCardBackVisible => expect(isCardBackVisible).to.equal(true))
);

Then(
  'I should see the last card {word} as {string}',
  (cardElement, expectedText) => {
    const isDescription = cardElement === 'description';
    const cardSide = (isDescription && 'back') || 'front';
    const elementCssPath = (isDescription && '.card-body > .card-text') || '.card-body > .card-title';
    return getTextContent(`.card-group > .flipper:last-child > .card.${cardSide} > ${elementCssPath}`)
      .then(text => expect(text).to.equal(expectedText));
  }
);