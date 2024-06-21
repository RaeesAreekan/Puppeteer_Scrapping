// import puppeteer from 'puppeteer'
// import fs from 'fs'

const puppeteer = require('puppeteer')
const fs = require('fs')
const QuestionModel = require('./database/models/Questions')

const {connectToDb} = require('./database/toDtbs');

(async ()=>{
    await connectToDb()
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    // await page.goto('https://developer.chrome.com/')
    // console.log("1 success")
    // await page.waitForResponse('https://developer.chrome.com/')
    // console.log("2 success")

    // await page.type('.devsite-search-field','automate beyond order')
    // await page.keyboard.press('Enter')
    // const searchSelector = '.gs-title'
    // await page.waitForSelector(searchSelector)
    // await page.click(searchSelector)
    // console.log("3 success")

    // const textSelector = await page.waitForSelector('.devsite-page-title')

    // console.log("4 success")
    // const fullTitle = await textSelector?.evaluate(el=>el.textContent)
    
    // console.log(fullTitle)
    // await page.goto('https://tensors.in/')
    // const textSelector = await page.$$('.css-czffb0')
    
    // if(textSelector.length>=2){
    //     const text2 = textSelector[3]
    //     const fullTitle = await text2?.evaluate(el=>el.textContent)
    //     console.log(fullTitle)
    // }
    // else{
    //     const fullTitle = await textSelector?.evaluate(el=>el.textContent)
    //     console.log(fullTitle)


    // }
    // The below code was used to extracting out general info regarding interview
    // await page.goto('https://www.geeksforgeeks.org/smart-questions-to-ask-in-a-job-interview/?ref=gcse')
    // await page.waitForSelector('h3')
    // const questions = await page.evaluate(()=>{
    //     const styles='text-align:justify'
    //     return Array.from(document.querySelectorAll('h3'))
    //     .filter(element => element.getAttribute('style') === styles)
    //     .map(element => element.textContent);
    // })
    // const question = await page.evaluate(()=>{
    //     const h3Elements = Array.from(document.querySelectorAll('h3'))
    //     const pElements = Array.from(document.querySelectorAll('p')).slice(3)
    //     const q_a = h3Elements.map((ele,ind)=>{
    //         const answer = pElements[ind] ? pElements[ind].innerText : 'No answer found'
    //         return{
    //             question: ele.innerText,
    //             answer: answer
    //         }

    //     })
    //     return q_a 
    // })
    await page.goto('https://www.geeksforgeeks.org/javascript-interview-questions-and-answers/?ref=header_search')
    await page.waitForSelector('h3')
    await page.waitForSelector('h2')
    const qa_pairs = await page.evaluate(()=>{
        const qa_array = []
        const h3Elements = Array.from(document.querySelectorAll('h3'))
        const h2Elements = Array.from(document.querySelectorAll('h2'))
        h3Elements.forEach(h3=>{
            const qstn = h3.innerText
            let answer = ''
            let nextElem = h3.nextElementSibling
            while(nextElem && (nextElem.tagName.toLowerCase() === 'p' || nextElem.tagName.toLowerCase() === 'ul' || nextElem.tagName.toLowerCase() === 'pre')){
                if(nextElem.tagName.toLowerCase()==='p'){
                    answer+=nextElem.innerText+ "\n"

                }
                else if(nextElem.tagName.toLowerCase() === 'ul'){
                    const bulletPoints = Array.from(nextElem.querySelectorAll('li')).map(li => li.innerText)
                    answer+=bulletPoints.join('\n') +"\n"
                }
                else if(nextElem.tagName.toLowerCase() === 'pre'){
                    answer+=nextElem.innerText + "\n"
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
    // qa_pairs.forEach(async(qa_pair,i)=>{
    //     let question = qa_pair.question;
    //     let answer = qa_pair.answer;
    //     const postQuestion = await QuestionModel.create({
    //         detailedAnswer:answer,
    //         keywords:[],
    //         level:"",
    //         question:question,
    //     })

    //     await postQuestion.save();
        
    // })
    fs.writeFileSync('qa_pairs.json',JSON.stringify(qa_pairs,null,2),'utf-8')
    // console.log('Questions and answers were extracted to qa_pairs.json')


    
    
    await browser.close()

})()

// module.exports = {qa_pairs}



