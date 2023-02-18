const router = require("express").Router();
const User = require("../models/UserModel.js")
const CryptoJS = require("crypto-js")


router.post("/register",async (req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
    })

    try {
        const savedUser = await newUser.save()
        res.status(200).json({message:"User created",savedUser})  
    } catch (err) {
        res.status(500).json(`Error in save : ${err}`)
    }
})


router.post("/login",async(req,res)=>{
    try {
        
        const user = await User.findOne({username:req.body.username})
        !user && res.status(401).json({message:"Wrong credintals"})

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        )

        const password = hashedPassword.toString(CryptoJS.enc.Utf8)

        password != req.body.password && 
        res.status(401).json({message:"Wrong credintals"})

        res.status(200).json({message:"User login",user})
    } catch (err) {
        res.status(500).json(`Error in save : ${err}`)
    }
})

module.exports = router