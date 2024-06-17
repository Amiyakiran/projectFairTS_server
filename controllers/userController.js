const users = require("../model/userSchema");
const jwt = require('jsonwebtoken')




//logic to register
exports.registerController = async(req, res)=>{
    console.log('inside controller register function');
    //extract data form request body- json()in index.js file convert json data into javaScript object
    const {username,email,password}= req.body
       try{const existUser =   await users.findOne({email})
       if(existUser){
        res.status(406).json('Account Already Exist....Please Login')
       }
       else{
           //create an object fro the model
           const newUser = new users({
            username,
            email,
            password,
            github:"",
            linkedin:"",
            profile:""
           })
           //save function in mongoose - to permanently store this data in mongodb
           await newUser.save()
             //response
            res.status(200).json(newUser)
       }}
       catch(err){
        res.status(401).json('Regester Request Failed due to',err)
       }
       
}

//logic to login
exports.loginController = async(req,res)=>{
    console.log('inside controller login function');

    const {email,password} = req.body
  
   try{ const existingUser = await users.findOne({email,password})
    console.log(existingUser);
     
    if(existingUser){
     
      const token = jwt.sign({userId:existingUser._id},"supersecretekey12345") //first argument is the data that is send inside the token and the second argument is the key based on which the token is generated
  
      res.status(200).json({
        existingUser,
        token
      })
    }
    else{
      res.status(406).json('Incoorect email id or password')
    }}catch(err){
        res.status(401).json(`login falied due ${err}`)
    }
}

//logic to update profile
exports.updateProfileController = async(req,res)=>{
  const userId = req.payload

  const {username ,email,password,github,linkedin ,profile} = req.body
  console.log(username ,email,password,github,linkedin ,profile);

  ProfileImage = req.file?req.file.filename:profile
  console.log(ProfileImage);

  try {
      const existingUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:ProfileImage},{new:true})
      await existingUser.save()
      res.status(200).json(existingUser)
      
  } catch (error) {
      res.status(401).json(`request failed due to ${error}`) 
  }
}