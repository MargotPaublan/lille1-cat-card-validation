# Lille 1 cat card validation

This project is a functional validation project for [Lille 1 cat card](https://github.com/tverhoken/lille1-cat-card) application.


## Aim

Run functional scenarios to check if the application under test respect application's features.

Features are described in [BDD style](https://cucumber.io/docs/bdd/) through scenarios written with [Gherkins syntax](https://cucumber.io/docs/gherkin/).
The overall is run by [Cucumber](https://cucumber.io) with [Javascript implementation](https://cucumber.io/docs/installation/javascript/).

## Getting started

### Prerequisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)

### Installation

```
$> git clone git@github.com:tverhoken/lille1-cat-card-validation.git
####################################################################
$> cd lille1-cat-card-validation
$> npm install
```

### Usage

Assuming you have the [Lille 1 cat card](https://github.com/tverhoken/lille1-cat-card) application running or you have a project that implement it with your own technical stack.

#### Running validation

```
$> npm run test
```
That run all tests for an application running on `http://localhost:8000`.

#### Running validation for a custom url

```
$> APPLICATION_BASE_URL=<your_application_base_url> npm run test
```

#### Running validation in debug mode

By default, validation is performed in ["headless" mode](https://en.wikipedia.org/wiki/Headless_browser) with the browser. In order to see what happen and to have time to see what happen, you can run tests in debug mode :

```
$> DEBUG=true npm run test
```

#### Running validation for a specific scenario

You may not want to run all scenarios but work or debug one or many in particular.
In order to do so, you can pass some [Cucumber CLI arguments](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#running-specific-features) to filter execution.

```
$> npm run test -- --name "Cat card deletion"
```


#### Test(s) failure

In case of one or many test failure, a screenshot is generated and available in `screenshots` directory.

## Contacts

Thomas VERHOKEN [![https://twitter.com/tverhoken][1.1]][1]

[1]: https://twitter.com/tverhoken
[1.1]: http://i.imgur.com/wWzX9uB.png