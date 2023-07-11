const express= require("express")
const dotenv= require("dotenv")
const errorHandler=require('./middlewares/error')
const connectDb= require("./config/db.js")
const bodyparser=require("body-parser")
const cors = require("cors");



//LOAD env variables
dotenv.config({path: './config/config.env'})


//db connected
connectDb()




const app=express()
app.use(express.json())
//cors
app.use(cors());

//Routes the files
const users=require('./routes/user.js')
const posts=require('./routes/post.js')
const auth=require('./routes/auth.js')
const comments=require('./routes/comment.js')
const follows=require('./routes/follow.js')
const notifications=require('./routes/notification.js')
const media=require('./routes/media')
const tags=require('./routes/tag')




//use routes
app.use('/api/users',users)
app.use('/api/posts',posts)
app.use('/api/auth',auth)
app.use('/api/comments',comments)
app.use('/api/follows',follows)
app.use('/api/notifications',notifications)
app.use('/api/media',media)
app.use('/api/tags',tags)

//errorHandler
app.use(errorHandler)

const PORT =process.env.PORT || 5000

app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))