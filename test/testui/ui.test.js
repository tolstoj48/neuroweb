"use strict"

// obsahy stran
// přihlášení
// funkcionality

const chai = require("chai");
const assert = chai.assert;

const puppeteer = require("puppeteer");

describe("Neuroweb - UI", function () {
  this.timeout(10000);
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch({
      sloMo: 500, 
      headless: false,
      args: [`--window-size=1920,1080`],
      defaultViewport: {
        width:1920,
        height:1080
      }
    })
    page = await browser.newPage()
  });

  after(async function () {
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
      await page.waitForSelector('a[href="/beos"]');
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
    // Beos
    await page.click('a[href="/qa"]');
    await page.click('a[href="/beos"]');
    assert.equal(await page.url(), "http://localhost:3000/beos")
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
  // h4 titulek 404
  assert.include(
    await page.$eval('body > pre', el => el.textContent),
    "ENOENT: no such file or directory"
  );
});

//
 // it("should visit and check ui of the login page", async function () {
 //   await page.goto("http://localhost:3033/prihlasit", { 'waitUntil' : 'domcontentloaded' });
 //   await page.waitForSelector('#username');
 //   await page.waitForSelector('#password');
 //   // login button
 //   await page.waitForSelector('body > main > div > div > div > div > div > form > div > button');
 // })

})