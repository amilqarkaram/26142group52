const jwt = require("jsonwebtoken");

const requireAuth = (req,res, next) =>{
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token, 'save the world secret', (err, decodedToken) =>{
      if(err){
        console.log("there was an error");
        res.redirect("/");
      }
      else{
        console.log(decodedToken);
        next();
      }
    });
  }
  else{
    res.redirect("/");
  }
}

module.exports = { requireAuth };
