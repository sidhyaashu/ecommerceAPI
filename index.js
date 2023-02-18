const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./route/userRoute.js")
const authControllers = require("./route/authControllers.js")
dotenv.config()


const DB = process.env.MONGO_URL
const PORT = process.env.PORT

//configarations
app.use(express.json())


//Routes
app.use('/api/auth',authControllers)
app.use("/api/user",userRoute)


mongoose.connect(DB)
    .then(()=>{
        app.listen(PORT || 5500,()=>{
            console.log(`Everithing is perfect on port : ${PORT}`)  
      })
    })
    .catch((err)=>console.log(err))