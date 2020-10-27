const { When, Then, defineParameterType } = require('@cucumber/cucumber');
const { expect } = require('chai');
const {
  clickOn,
  isElementVisible,
  getInputValue,
  fillInput,
  wait
} = require('./basic-browser-operations');

function capitalize(toCapitalize) {
  return toCapitalize.charAt(0).toUpperCase() + toCapitalize.slice(1)
}

defineParameterType({
  name: 'formType',
  regexp: /creation|edition/,
  transformer: s => s
});

When(
  'I click on the header\'s back button',
  () => clickOn('header > .btn')
);

When(
  'I click on the cat card {formType} save button',
  _ => clickOn('#cardForm > .btn.btn-primary').then(() => wait(350))
);

When(
  'I click on the cat card deletion button',
  () => clickOn('#cardForm > .btn.btn-danger').then(() => wait(350))
);

When(
  'I fill the card {word} input with {string}',
  (cardInput, value) => fillInput(`#card${capitalize(cardInput)}`, value)
);

Then(
  'I should see the cat card {formType} page',
  _ => isElementVisible('#cardForm')
    .then(isVisible => expect(isVisible).to.equal(true))
)

Then(
  'I should see an empty form',
  () => Promise.all([
    getInputValue('#cardTitle'),
    getInputValue('#cardImage'),
    getInputValue('#cardDescription')
  ]).then(inputValues => {
    const [ cardTitle, cardImage, cardDescription ] = inputValues;
    expect(cardTitle).to.be.empty;
    expect(cardImage).to.be.empty;
    expect(cardDescription).to.be.empty;
  })
);

Then(
  'I should see the save button',
  () => isElementVisible('#cardForm > .btn.btn-primary').then(isVisible => expect(isVisible).to.equal(true))
);

Then(
  /I should(.*) see the delete button/,
  not => {
    const shouldDeleteButtonBeVisible = !not;
    return isElementVisible('#cardForm > .btn.btn-danger').then(isVisible => expect(isVisible).to.equal(shouldDeleteButtonBeVisible));
  }
);

Then(
  'I should see the cat card {formType} page header',
  _ => Promise.all([
    isElementVisible('header'),
    isElementVisible('header > h1'),
    isElementVisible('header > .btn')
  ])
  .then(areElementsVisible => {
    const [ isHeaderVisible, isTitleVisible, isBackButtonVisible ] = areElementsVisible;
    expect(isHeaderVisible).to.equal(true);
    expect(isTitleVisible).to.equal(true);
    expect(isBackButtonVisible).to.equal(true);
  })
);

Then(
  'I should see the card {word} input in error',
  cardInput => isElementVisible(`#card${capitalize(cardInput)}.form-control:invalid`).then(isVisible => expect(isVisible).to.equal(true))
);

Then(
  'I should see an error message under card {word} input',
  cardInput => isElementVisible(`#card${capitalize(cardInput)} ~ .invalid-feedback`).then(isVisible => expect(isVisible).to.equal(true))
);

Then(
  'I should see the card {word} input as valid',
  cardInput => isElementVisible(`#card${capitalize(cardInput)}.form-control:valid`).then(isVisible => expect(isVisible).to.equal(true))
);

Then(
  'I should see the card {word} input with text',
  cardInput => getInputValue(`#card${capitalize(cardInput)}`).then(value => expect(value).not.to.be.empty)
);