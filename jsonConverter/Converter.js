// const fs = require("fs")
// const mongoose = require('mongoose')
// const {connectToDb} = require('../database/toDtbs')
// const {Java_Questions} = require('../database/models/Questions.js')

// import {fs} from 'fs'
// import {mongoose} from 'mongoose'
// import {connectToDb} from '../database/toDtbs'
// import {Java_Questions} from '../database/models/Questions.js'

// (async()=>{
//     await connectToDb()
//     const jsonData = fs.readFileSync('qa_pairs_java1.json','utf-8')
//     const qstns = JSON.parse(jsonData)
//     const importdata = async()=>{
//         try{
//             await Java_Questions.insertMany(qstns)
//             console.log("Data successfully imported!")

//         }
//         catch(err){
//             console.log(err)

//         }
//         finally{
//             mongoose.connection.close()
//         }

//     }
//     importdata()

// })()

const fs = require("fs");
const mongoose = require('mongoose');
const { connectToDb } = require('../database/toDtbs');
const { Python_Questions } = require('../database/models/Questions.js');

(async () => {
    await connectToDb();

    



    const jsonData = fs.readFileSync('qa_pairs_python.json')
    const qstns = JSON.parse(jsonData);
    const updt_qstns = qstns.map(q=>({
        question:q.question,
        detailedAnswer:q.answer,
        keywords:[],
        level:""
    }))

    const importdata = async () => {
        try {
            await Python_Questions.insertMany(updt_qstns);
            console.log("Data successfully imported!");
        } catch (err) {
            console.error("Error importing data:", err);
        } finally {
            mongoose.connection.close();
        }
    }
    importdata()

    // await importdata();
    // Now , we got thru each json data , and remove those , which have empty question field
    // const jsonData = fs.readFileSync('qa_pairs_java1.json', 'utf-8');
    // const Question = JSON.parse(jsonData)
    
    // const cleanedData = Question.filter(q=>q.question && q.question.trim()!=='')
    // fs.writeFileSync('cleanedData.json',JSON.stringify(cleanedData,null,2),'utf-8')
    

})();
