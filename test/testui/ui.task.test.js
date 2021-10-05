'use strict'

const chai = require("chai")
  , assert = chai.assert
  , expect = chai.expect
  , puppeteer = require("puppeteer")

describe("Neuroweb - UI General and Task", function () {
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
    page = await browser.newPage();
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

  it("should visit and check ui of the homepage", async function () {
    await page.goto("http://localhost:3000");
    // Homepage
    await page.waitForSelector('a[href="/"]');
    // In-house db
    await page.waitForSelector('a[href="/in-house-db"]');
    // Annotation
    await page.waitForSelector('a[href="/annotation"]');
    // Filter
    await page.waitForSelector('a[href="/filter"]');
    // Merge
    await page.waitForSelector('a[href="/merge"]');
    // Beos
    await page.waitForSelector('a[href="/beds"]');
    // Faszqs
    await page.waitForSelector('a[href="/fastqs"]');
    // Bam-crams
    await page.waitForSelector('a[href="/bam-crams"]');
  })

  it("should check correct links and click them, ensure the correct urls of the links", async function () {
    await page.goto("http://localhost:3000");
    // Homepage
    await page.click('a[href="/"]');
    assert.equal(await page.url(), "http://localhost:3000/")
    // In-house db
    await page.click('a[href="/in-house-db"]');
    assert.equal(await page.url(), "http://localhost:3000/in-house-db")
    // Annotation
    await page.click('a[href="/vcfs"]');
    await page.click('a[href="/annotation"]');
    assert.equal(await page.url(), "http://localhost:3000/annotation")
    // Filter
    await page.click('a[href="/vcfs"]');
    await page.click('a[href="/filter"]');
    assert.equal(await page.url(), "http://localhost:3000/filter")
    // Merge
    await page.click('a[href="/vcfs"]');
    await page.click('a[href="/merge"]');
    assert.equal(await page.url(), "http://localhost:3000/merge")
    // Beds
    await page.click('a[href="/qa"]');
    await page.click('a[href="/beds"]');
    assert.equal(await page.url(), "http://localhost:3000/beds")
    // Faszqs
    await page.click('a[href="/qa"]');
    await page.click('a[href="/fastqs"]');
    assert.equal(await page.url(), "http://localhost:3000/fastqs")
    // Bam-crams
    await page.click('a[href="/qa"]');
    await page.click('a[href="/bam-crams"]');
    assert.equal(await page.url(), "http://localhost:3000/bam-crams")
  })


  it("should get incorrect link", async function () {
    await page.goto("http://localhost:3000/incorrect-url");
    // H4 title 404
    assert.include(
      await page.$eval('body .alert', el => el.textContent),
      "The page hasn´t been found!"
    );
  });

  it("should get to the main page from new task form", async function () {
    await page.goto("http://localhost:3000");
    await page.click('a[href="/tasks/new-task"]');
    await page.waitForSelector('a[href="/"]');
    await page.click('#backBtn');
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.include(`<h1 class="mt-2">To do list</h1>`);
  });

  it("should create a new task", async function () {
    await page.goto("http://localhost:3000");
    await page.click('a[href="/tasks/new-task"]');
    await page.waitForSelector('a[href="/"]');
    await page.focus('#to-do-task');
    await page.keyboard.type('Hello');
    await page.focus('#who-wants-it');
    await page.keyboard.type('Hello');
    await page.click('#submitBtn');
  });

  it("should check new task in the list has been created", async function () {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.include(`<td>\n            Hello\n          </td>`);
  });

  it("should edit task from the list", async function () {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('a[href="/"]');
    await page.click(".edit");
    // Delete all the content from input
    await page.focus('#to-do-task');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('peklo');
    // Delete all the content from the input
    await page.focus('#who-wants-it');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('peklo');
    await page.click('#submitBtn');
  });

  it("should check edits on edited task in the list", async function () {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.include(`<td>\n            peklo\n          </td>`);
  });

  it("should get to the main page from edit task form", async function () {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('a[href="/"]');
    await page.click(".edit");
    await page.waitForSelector('a[href="/"]');
    await page.click('#backBtn');
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.include(`<h1 class="mt-2">To do list</h1>`);
  });

  it("should get to the main page from delete task form", async function () {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('a[href="/"]');
    await page.click(".delete");
    await page.waitForSelector('a[href="/"]');
    await page.click('#backBtn');
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.include(`<h1 class="mt-2">To do list</h1>`);
  });

  it("should delete task from the list", async function () {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('a[href="/"]');
    await page.click(".delete");
    await page.click('#deleteBtn');
  });

  it("should check edits on edited task in the list", async function () {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('a[href="/"]');
    expect(await page.content()).to.not.include(`<td>\n            peklo\n          </td>`);
  });
})