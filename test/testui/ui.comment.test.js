'use strict'

const chai = require("chai");
const expect = chai.expect;

const puppeteer = require("puppeteer");

describe("Neuroweb - UI Comment", function () {
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
  });

  after(async function () {
    await page.close();
    await browser.close();
  });

  it("should get to the main page from new comment form", async function() {
    await page.goto("http://localhost:3000/ngs-com");
    await page.click('a[href="/ngs-com/new-comment"]');
    await page.waitForSelector('a[href="/"]');
    await page.click('#backBtn');
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.include(`<h1>NGS comments</h1>`);
  });

  it("should create a new comment", async function() {
    await page.goto("http://localhost:3000/ngs-com");
    await page.waitForSelector('a[href="/ngs-com/new-comment"]');
    await page.click('a[href="/ngs-com/new-comment"]');
    await page.waitForSelector('#name');
    await page.waitFor(3000);
    await page.focus('#name');
    await page.keyboard.type('Hello');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
  });

  it("should check new comment in the accordion has been created", async function() {
    await page.goto("http://localhost:3000/ngs-com");
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.include(`<button class="accordion-button collapsed"`);
    expect(await page.content()).to.include(`<strong class="ms-auto"> Hello </strong>`);
  } );

  it("should edit comment from the list", async function() {
    await page.goto("http://localhost:3000/ngs-com");
    await page.waitForSelector('.edit');
    await page.click(".edit");
    await page.waitForSelector('#name');
    await page.waitFor(4000);
    // Delete all the content from input
    await page.focus('#name');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('peklo');
    // Delete all the content from the input
    await page.keyboard.press('Tab');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('peklo');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
  });

  it("should check edits on edited comment in the list", async function() {
    await page.goto("http://localhost:3000/ngs-com");
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.include(`<button class="accordion-button collapsed"`);
    expect(await page.content()).to.include(`<strong class="ms-auto"> peklo </strong>`);
  });


  it("should get to the main page from edit comment form", async function() {
    await page.goto("http://localhost:3000/ngs-com");
    await page.waitForSelector('a[href="/"]');
    await page.click(".edit");
    await page.waitForSelector('a[href="/"]');
    await page.click('#backBtn');
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.include(`<h1>NGS comments</h1>`);
  });

  it("should get to the main page from delete comment form", async function() {
    await page.goto("http://localhost:3000/ngs-com");
    await page.waitForSelector('a[href="/"]');
    await page.click(".delete");
    await page.waitForSelector('a[href="/"]');
    await page.click('#backBtn');
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.include(`<h1>NGS comments</h1>`);
  });

  it("should delete comment from the list", async function() {
    await page.goto("http://localhost:3000/ngs-com");
    await page.waitForSelector('a[href="/"]');
    await page.click(".delete");
    await page.waitForSelector('a[href="/"]');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
  });

  it("should check edits on edited comment in the list", async function() {
    await page.goto("http://localhost:3000/ngs-com");
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.not.include(`<strong class="ms-auto"> peklo </strong>`);
  });
})