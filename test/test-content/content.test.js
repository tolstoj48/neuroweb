"use strict"

// obsahy stran
// přihlášení
// funkcionality

const chai = require("chai");
const expect = chai.expect;

const puppeteer = require("puppeteer");

function testContent(page, specificArray, contentArray) {
  const resultArray = specificArray.concat(contentArray);
  resultArray.forEach(async content => {
    try {
      expect(await page.content()).to.include(content)
    } catch (err) {
      console.log(err)
    }
  });
}

const testedContentArray = [
`<input type="date" class="form-control" id="date" name="date"`,
`<textarea class="form-control" id="to-do-task" name="to_do_task`,
`<input class="form-control" id="who-wants-it" name="who_wants_it" placeholder="Your name..." maxlength="50"`,
`<select class="form-select" id="done" name="done"`,
]

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

  it("should test to do list page", async function () {
    await page.goto("http://localhost:3000/");
    await page.waitForSelector('#to-do-list');
    expect(await page.content()).to.include(`<h1 class="mt-2">To do list</h1>`);
  });

  it("should test creation of new task: /tasks/new-task", async function () {
    await page.goto("http://localhost:3000/tasks/new-task");
    await page.waitForSelector('legend');
    await testContent(page, [`<legend>Create a new task</legend>`], testedContentArray);
  });

  it("should test editing: /edit/:taskId", async function () {
    await page.goto("http://localhost:3000/tasks/edit/60fea503d0bae02a4450251c");
    await page.waitForSelector('legend');
    await testContent(page, [`<legend>Edit an existing task</legend>`], testedContentArray);
  });

  it("should test deleting: /delete/:taskId", async function () {
    await page.goto("http://localhost:3000/tasks/delete/60fea503d0bae02a4450251c");
    await page.waitForSelector('legend');
    await testContent(page, [`<legend>Confirm the delete of the task</legend>`], testedContentArray);  
  });
});