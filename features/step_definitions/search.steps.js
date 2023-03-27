const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { getText, clickElement } = require("../../lib/commands.js");

setDefaultTimeout(1000 * 60);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru${string}`, {
    setTimeout: 20000,
  });
});

When("user click on {string}", async function (string) {
  return await clickElement(this.page, string);
});

When("user selects the date and time", async function () {
  let date = ".page-nav > a:nth-child(3)";
  let time = '[data-seance-id="142"]';
  await clickElement(this.page, date);
  return await clickElement(this.page, time);
});

When(
  "user chooses seat on {string} row and {string} chair and click on Забронировать button",
  async function (row, chair) {
    await clickElement(
      this.page,
      `div:nth-child(${row}) > span:nth-child(${chair})`
    );
    return await clickElement(this.page, "button.acceptin-button");
  }
);

When("user clicks on Забронировать button", async function () {
  return await clickElement(this.page, "button.acceptin-button");
});

When("user sees the page title", async function () {
  return await getText(this.page, "header h1");
});

Then("user sees the ticket suggested {string}", async function (string) {
  const actual = await getText(this.page, ".acceptin-button");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user sees the first movie {string}", async function (string) {
  const actual = await getText(
    this.page,
    "main > section:nth-child(1) > div.movie__info > div.movie__description > h2"
  );
  const expected = await string;
  expect(actual).contains(expected);
});

Then(
  "user didn't go to booking confirmation page, stayed on current page and sees {string}",
  async function (string) {
    const actual = await getText(
      this.page,
      ".buying-scheme__legend > div:nth-child(1) > p:nth-child(2)"
    );
    const expected = await string;
    expect(actual).contains(expected);
  }
);
