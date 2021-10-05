'use strict'

const chai = require("chai")
  , expect = chai.expect

const puppeteer = require("puppeteer");

describe("Neuroweb - UI annotation", function () {
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

  it("should go to the annotation page and check content", async function () {
    await page.goto("http://localhost:3000/annotation");
    expect(await page.content()).to.include(`<a href="/annotation/upload-data" class="btn btn-lg btn-outline-primary strong mt-3">+ Upload data</a>`);
    expect(await page.content()).to.include(`<th scope="col">Name of the uploaded file</th>`);
    expect(await page.content()).to.include(`<th scope="col">Status of annotation</th>`);
    expect(await page.content()).to.include(`<th scope="col">Date of the upload</th>`);
    expect(await page.content()).to.include(`<th scope="col">Download</th>`);
  });

  it("should go to the annotation page click upload and check content", async function () {
    await page.goto('http://localhost:3000/annotation');
    await page.waitForSelector('a[href="/annotation/upload-data"]');
    await page.click('a[href="/annotation/upload-data"]');
    await page.waitForSelector('#title');
    expect(await page.content()).to.include(`<h1 id="title" class="mt-2 mb-3">Upload a file for the annotation</h1>`);
    expect(await page.content()).to.include(`<button class="btn btn-outline-success">Upload the file</button>`);
  });
})