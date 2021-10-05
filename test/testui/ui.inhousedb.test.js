'use strict'

const chai = require("chai")
  , expect = chai.expect

const puppeteer = require("puppeteer");

describe("Neuroweb - UI inhousedb", function () {
  this.timeout(15000);
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch({
      sloMo: 500,
      headless: false,
      args: [`--window-size=1920,1080`],
      defaultViewport: {
        width: 1920,
        height: 1080
      }
    })

    page = await browser.newPage()
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('#username');
    await page.focus('#username');
    await page.keyboard.type('petr');
    await page.focus('#password');
    await page.keyboard.type('Alena');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
  });

  after(async function () {
    await page.goto('http://localhost:3000/logout');
    await page.close();
    await browser.close();
  });

  it("should go to the inhousedb page and check content", async function () {
    await page.goto("http://localhost:3000/in-house-db");
    expect(await page.content()).to.include(`<a href="/in-house-db/import-data" class="btn btn-lg btn-outline-primary strong mt-3">+ Import data</a>`);
    expect(await page.content()).to.include(`<a href="/in-house-db/delete-data-confirm" class="btn btn-lg btn-outline-primary strong mt-3">+ Delete data</a>`);
    expect(await page.content()).to.include(`<button id="searchGnomenBtn" class="btn btn-outline-primary`);
    expect(await page.content()).to.include(`<button id="searchGeneRefGeneBtn" class="btn btn-outline-primary`);
  });

  it("should go to the inhousedb page type in gNomen input and search the expression", async function () {
    await page.goto('http://localhost:3000/in-house-db');
    await page.waitForSelector('#searchGnomen');
    await page.focus('#searchGnomen');
    await page.keyboard.type('qui');
    await page.click('#searchGnomenBtn');
    await page.waitFor(2000);
    expect(await page.content()).to.include(`The searched category has been: <em>"gNomen"</em>`);
    expect(await page.content()).to.include(`The searched expression has been: <em>"qui"</em>`);
    expect(await page.content()).to.include(`The number of found positions:`);
    expect(await page.content()).to.include(`The fulltext search in the results: *`);
  });

  it("should go to the inhousedb page type in Gene input and search the expression", async function () {
    await page.goto('http://localhost:3000/in-house-db');
    await page.waitForSelector('#searchGeneRefGene');
    await page.focus('#searchGeneRefGene');
    await page.keyboard.type('qui');
    await page.click('#searchGeneRefGeneBtn');
    await page.waitFor(2000);
    expect(await page.content()).to.include(`The searched category has been: <em>"Gene_refGene"</em>`);
    expect(await page.content()).to.include(`The searched expression has been: <em>"qui"</em>`);
    expect(await page.content()).to.include(`The number of found positions:`);
    expect(await page.content()).to.include(`The fulltext search in the results: *`);
  });

  it("should go to the upload page and check content", async function () {
    await page.goto('http://localhost:3000/in-house-db');
    await page.click('a[href="/in-house-db/import-data"]');
    await page.waitForSelector('button[class="btn btn-outline-success"]');
    expect(await page.content()).to.include(`<button class="btn btn-outline-success">Upload the file</button>`);
  });

  it("should go to the delete page and check content", async function () {
    await page.goto('http://localhost:3000/in-house-db');
    await page.click('a[href="/in-house-db/delete-data-confirm"]');
    await page.waitForSelector('a[href="/in-house-db/delete-data"]');
    expect(await page.content()).to.include(`<h3>Do you really want to delete all the data from the in-house db?</h3>`);
  });
})