const fs = require("fs");
const mongoose = require('mongoose');
const { connectToDb } = require('../database/toDtbs');
const {CPP_Questions} = require('../database/toDtbs')
const puppeteer = require('puppeteer')

(async () => {
    await connectToDb();
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.geeksforgeeks.org/cpp-interview-questions/')
    await page.waitForSelector('h3')
    

    

})()