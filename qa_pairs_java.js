const fs = require('fs');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
// const { connectToDb } = require('../database/toDtbs');
// const {CPP_Questions} = require('../database/toDtbs')
// import puppeteer from 'puppeteer'
// import fs from 'fs'
(async()=>{
    // await connectToDb()
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // await page.goto('https://www.geeksforgeeks.org/java-interview-questions/?ref=header_search')
    // await page.goto('https://www.geeksforgeeks.org/cpp-interview-questions/')
    // await page.goto('https://www.geeksforgeeks.org/networking-interview-questions/')
    await page.goto('https://www.geeksforgeeks.org/python-interview-questions/')
    await page.waitForSelector('h2')
    const qa_pairs = await page.evaluate(()=>{
        const qa_array= []
        const h3elements = Array.from(document.querySelectorAll('h2'))
        h3elements.forEach(h3=>{
            const qstn = h3.innerText
            let answer=''
            let nextElem = h3.nextElementSibling
            
            while(nextElem && (nextElem.tagName.toLowerCase() === 'p' || nextElem.tagName.toLowerCase() === 'ul' || nextElem.tagName.toLowerCase() === 'pre' || nextElem.tagName.toLowerCase() === 'ol' || nextElem.tagName.toLowerCase() === 'div' || nextElem.tagName.toLowerCase() === 'table' || nextElem.tagName.toLowerCase() === 'gfg-tabs' )){
                if(nextElem.tagName.toLowerCase()==='p'){
                    answer+=nextElem.innerText+ "\n"

                }
                else if(nextElem.tagName.toLowerCase() === 'ul'){
                    const bulletPoints = Array.from(nextElem.querySelectorAll('li')).map(li => li.innerText)
                    answer+=bulletPoints.join(',\n') +"\n"                  // Each element is seperated by ",\n"
                }
                else if(nextElem.tagName.toLowerCase() === 'pre'){
                    answer+=nextElem.innerText + "\n"
                }
                else if(nextElem.tagName.toLowerCase() === 'ol'){
                    const bulletPoints = Array.from(nextElem.querySelectorAll('li')).map(li => li.innerText)
                    answer+=bulletPoints.join(',\n') +"\n"

                }
                else if (nextElem.tagName.toLowerCase() === 'table'){
                    const headers = Array.from(nextElem.querySelectorAll('thead th'))
                    const headerTexts = headers.map(header => header.innerText)
                    const rows = Array.from(nextElem.querySelectorAll('tbody tr'));
                    const columns = headerTexts.map(()=>[]);
                    
                    rows.forEach(row => {
                        const cells = Array.from(row.querySelectorAll('td, th'));
                        cells.forEach((cell, index) => {
                            columns[index].push(cell.innerText);
                        });
                    })
                    columns.forEach((col, index) => {
                        answer += `${headerTexts[index]}\n` + col.join(',\n') + ';\n\n';   // in table , 2nd columns starts after a ";" 
                    })

                }
                nextElem = nextElem.nextElementSibling
            }
            qa_array.push({
                question: qstn,
                answer: answer.trim()
            })

        })
        return qa_array
    })
    fs.writeFileSync('qa_pairs_python.json',JSON.stringify(qa_pairs,null,2),'utf-8')
    console.log('Questions and answers were extracted to qa_pairs_python.json')
    // qa_pairs.forEach(async(q,i)=>{
    //     let question = q.question
    //     let detailedAnswer = q.answer
    //     const postQuestion = await CPP_Questions.create({
    //         question: question,
    //         detailedAnswer: detailedAnswer,
    //         keywords: [],
    //         level: ""
    //     })
    //     await postQuestion.save()


    // })




    await browser.close()
    
})()