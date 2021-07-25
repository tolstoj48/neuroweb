"use strict"

// obsahy stran
// přihlášení
// funkcionality

const chai = require("chai");
const expect = chai.expect;

const puppeteer = require("puppeteer");

describe("Neuroweb - content", function () {
  this.timeout(10000);
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
  });

  after(async function () {
    await page.close();
    await browser.close();
  });

  it("should test searching and its result", async function () {
    await page.goto("http://localhost:3000/");
    await page.waitForSelector('#to-do-list');
    expect(await page.content()).to.include(`<h1 class="mt-2">To do list</h1>`);
  })

})