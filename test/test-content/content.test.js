'use strict'

/* ||| To do:
  
*/

// obsahy stran
// přihlášení
// funkcionality

const chai = require('chai');
const expect = chai.expect;

const puppeteer = require('puppeteer');

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

describe('Neuroweb - content after login', function () {
  this.timeout(10000);
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch({
      sloMo: 500,
      headless: false,
      args: [`--window-size=1920,1080`],
      defaultViewport: {
        width: 1200,
        height: 800
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

  it('should test to do list page', async function () {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#to-do-list');
    expect(await page.content()).to.include(`<h1 class="mt-2">To do list</h1>`);
  });
  
  it('should test creation of new task: /tasks/new-task', async function () {
    await page.goto('http://localhost:3000/tasks/new-task');
    await page.waitForSelector('legend');
    await testContent(page, [`<legend>Create a new task</legend>`], testedContentArray);
  });

  it('should test editing: /edit/:taskId', async function () {
    await page.goto('http://localhost:3000');
    await page.click('.edit');
    await page.waitForSelector('legend');
    await testContent(page, [`<legend>Edit an existing task</legend>`], testedContentArray);
  });

  it('should test deleting: /delete/:taskId', async function () {
    await page.goto('http://localhost:3000');
    await page.click('.delete');
    await page.waitForSelector('legend');
    await testContent(page, [`<legend>Confirm the delete of the task</legend>`], testedContentArray);  
  });

  it('should test inhouse db content: /in-house-db', async function () {
    await page.goto('http://localhost:3000/in-house-db');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h1 class="mt-2">In-house database</h1>`);
    expect(await page.content()).to.include(`<strong>The number of the entries in the in-house db:`);
  });

  it('should test inhouse db content: /in-house-db/import-data', async function () {
    await page.goto('http://localhost:3000/in-house-db/import-data');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h1 id="title" class="mt-2 mb-3">Import the data to the in-house database</h1>`);
  });

  it('should test inhouse db content: /in-house-db/delete-data-confirm', async function () {
    await page.goto('http://localhost:3000/in-house-db/delete-data-confirm');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h1 id="title" class="mt-2 mb-3">Delete the data from the in-house database</h1>`);
  });
  
  it('should test inhouse db content: /annotation', async function () {
    await page.goto('http://localhost:3000/annotation');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h1>Annotation</h1>`);
  });
  
  it('should test inhouse db content: /filter', async function () {
    await page.goto('http://localhost:3000/filter');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h1>Filter</h1>`);
  });

  it('should test inhouse db content: /merge', async function () {
    await page.goto('http://localhost:3000/merge');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h1>Merge</h1>`);
  });

  it('should test inhouse db content: /beds', async function () {
    await page.goto('http://localhost:3000/beds');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h1>Beds</h1>`);
  });

  it('should test inhouse db content: /fastqs', async function () {
    await page.goto('http://localhost:3000/fastqs');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h1>Fastqs</h1>`);
  });

  it('should test inhouse db content: /bam-crams', async function () {
    await page.goto('http://localhost:3000/bam-crams');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h1>Bam-crams</h1>`);
  });

  it('should test inhouse db content: /ngs-com', async function () {
    await page.goto('http://localhost:3000/ngs-com');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h1>NGS comments</h1>`);
  });

  it('should test inhouse db content: /ngs-com/new-comment', async function () {
    await page.goto('http://localhost:3000/ngs-com/new-comment');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<legend>Create a new comment</legend>`);
    expect(await page.content()).to.include(`<button id="submitBtn" class="btn btn-lg btn-outline-success strong mt-3 mb-3 col-5">Save the comment</button>`);
  });

  it('should test inhouse db content: /register', async function () {
    await page.goto('http://localhost:3000/register');
    await page.waitForSelector('main');
    expect(await page.content()).to.include(`<h5 id="title">Registration of a new user</h5>`);
    expect(await page.content()).to.include(`Register new user`);
  });
})

describe('Neuroweb - content before login', function () {
  this.timeout(10000);
  let browser;
  let page;

  before(async function () {
    browser = await puppeteer.launch({
      sloMo: 500,
      headless: false,
      args: [`--window-size=1920,1080`],
      defaultViewport: {
        width: 1200,
        height: 800
      }
    })
    page = await browser.newPage();
  });

  after(async function () {
    await page.close();
    await browser.close();
  });

  it('should test that not possible to go to pages without login', async function () {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.alert-heading');
    expect(await page.content()).to.include(`<h4 class="alert-heading text-center">`);
    expect(await page.content()).to.include(`<h5>Login</h5>`);
  });

  it('should test that not possible to login with incorrect credentials', async function () {
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('#username');
    await page.focus('#username');
    await page.keyboard.type('1321556465');
    await page.focus('#password');
    await page.keyboard.type('fvsdfv54sdf465');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    expect(await page.content()).to.include(`Password or username is incorrect`);
    expect(await page.content()).to.include(`<h5>Login</h5>`);
  });
})