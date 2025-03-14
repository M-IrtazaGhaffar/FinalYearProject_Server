require("dotenv").config();
const { Queue } = require('bullmq')
// const { Worker } = require('bullmq')

const chatbotQueue =  new Queue('chatbot-queue', {
    connection: {
        host: process.env.REDIS,
        port: process.env.REDIS_PORT
    }
})

const forgotPasswordQueue =  new Queue('forgotpassword-queue', {
    connection: {
        host: process.env.REDIS,
        port: process.env.REDIS_PORT
    }
})

const reciptQueue =  new Queue('recipt-queue', {
    connection: {
        host: process.env.REDIS,
        port: process.env.REDIS_PORT
    }
})

console.log('123');


// const chatbotWorker = new Worker('chatbot-queue', async job => {
//     console.log('Processing job', job.id, job.data)
//     return 'done'
// }, {
//     connection: {
//         host: 'localhost',
//         port: 6379
//     }
// })

module.exports = { chatbotQueue }