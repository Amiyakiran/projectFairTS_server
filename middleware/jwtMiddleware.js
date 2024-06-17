//import jwt
const jwt = require('jsonwebtoken')



const jwtMiddleWare = (req,res,next)=>{
  console.log('inside jwt Middleware');
  const token = req.headers['authorization'].split(' ')[1]
  console.log(token);

  try {
    const jwtResponse = jwt.verify(token,"supersecretekey12345") //verify returns an object which contains the secrete info and the iat which is the additional info(time of issue  of jwt token)
    console.log(jwtResponse);
    req.payload =jwtResponse.userId
    next()
    
  } catch (err) {
    res.status(401).json('Authorization failed .....please Login')
  }

  
}

module.exports = jwtMiddleWare