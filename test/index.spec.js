import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

let page;
let browser;
const styles = `file://${path.resolve('style.css')}`
const indexPage = `file://${path.resolve('index.html')}`
const addEntryPage = `file://${path.resolve('add-entry.html')}`
const width = 1440;
const height = 900;

describe('index HTML', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });
  afterAll(async () => {
    await page.goto(indexPage);
    await page.screenshot({path: 'index.png'});
    await page.goto(addEntryPage);
    await page.screenshot({path: 'add-entry.png'});
    browser.close();
  });

  it('style.css should exist', (done) => {
    fs.readFile(path.resolve('style.css'), (err, data) => {
      expect(err).toBeNull();
      done();
    })
  });

  it('Should use \'display: flex\' on body ', (done) => {
    fs.readFile(path.resolve('style.css'), 'utf8', function (err,data) {
      expect(data.indexOf('display') > -1).toBeTruthy()
      expect(data.indexOf('flex') > -1).toBeTruthy()
      done()
    });
  });

  it('Should style the table', (done) => {
    fs.readFile(path.resolve('style.css'), 'utf8', function (err,data) {
      expect(data.indexOf('table') > -1).toBeTruthy()
      done()
    });
  });

  it('Should have a background-image with no-repeat', (done) => {
    fs.readFile(path.resolve('style.css'), 'utf8', function (err,data) {
      expect(data.indexOf('no-repeat') > -1).toBeTruthy()
      done()
    });
  });

  it('Should use hover effect on a link', (done) => {
    fs.readFile(path.resolve('style.css'), 'utf8', function (err,data) {
      expect(data.indexOf('a:hover') > -1).toBeTruthy()
      done()
    });
  });

  it('Should use another font', (done) => {
    fs.readFile(path.resolve('style.css'), 'utf8', function (err,data) {
      expect(data.indexOf('font-family') > -1).toBeTruthy()
      done()
    });
  });
});
