const express = require('express')
const userRouter = require('./routers/user')
require('dotenv').config()
require('./connect/mongoConnect')


const app = express()
const  port= process.env.PORT 


app.use(express.json())
app.use(userRouter)
app.use((req, res, next) => res.status(404).send({ NotFound: '404 not found' }))
app.listen(port, () => {
    console.log(`Server is up on ${port}`)
})