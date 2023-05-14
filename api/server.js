const express= require("express")
const dotenv= require("dotenv")
const connectDb= require("./config/db.js")
const bodyparser=require("body-parser")
const errorHandler=require('../middlewares/error.js')


//LOAD env variables
dotenv.config({path: './config/config.env'})


//db connected
connectDb()

//mount routes
const users=require('./routes/user.js')


const app=express()
app.use(express.json())

//use routes
app.use('/api/users',users)

app.use(errorHandler)

//errorHandler
app.use(errorHandler)

const PORT =process.env.PORT || 5000

app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))