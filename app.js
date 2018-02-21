const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('./config')(app)

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
