import puppeteer from 'puppeteer'
(async ()=>{
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
    await page.goto('https://www.geeksforgeeks.org/smart-questions-to-ask-in-a-job-interview/?ref=gcse')
    await page.waitForSelector('h3')
    // const questions = await page.evaluate(()=>{
    //     const styles='text-align:justify'
    //     return Array.from(document.querySelectorAll('h3'))
    //     .filter(element => element.getAttribute('style') === styles)
    //     .map(element => element.textContent);
    // })
    const question = await page.evaluate(()=>{
        const h3Elements = Array.from(document.querySelectorAll('h3'))
        const pElements = Array.from(document.querySelectorAll('p')).slice(3)
        const q_a = h3Elements.map((ele,ind)=>{
            const answer = pElements[ind] ? pElements[ind].innerText : 'No answer found'
            return{
                question: ele.innerText,
                answer: answer
            }

        })
        return q_a 
    })
    question.forEach((q,i)=>{
        console.log(`${q.question}`)
        console.log(`${q.answer}`)
        console.log('----------------')
    })

    
    
    await browser.close()

})()



