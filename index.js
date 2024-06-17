
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router')
require('./connection')
const projectFairServer = express()
projectFairServer.use(cors())
projectFairServer.use(express.json())
projectFairServer.use(router)
projectFairServer.use('/uploads',express.static('./uploads'))
const PORT = 3000 || process.env.PORT
projectFairServer.listen(PORT,()=>{
    console.log(`project fair server running successfully at port number : ${PORT}`);
})

projectFairServer.get('/',(req,res)=>{
    res.send('get request recieved')
})

