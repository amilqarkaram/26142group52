const express = require("express");
const util = require("util");
const bodyParser = require("body-parser");
const ejs = require("ejs"); //required to embedd javascript. In other words, dynamically change html by sending data from server and filling in an html template
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");// provides a hashing function to help store user passwords not as plain text
const saltRounds = 10;
mongoose.connect("mongodb+srv://admin-amilqar:123hurBnomC@cluster0.rmpoy.mongodb.net/SaveTheUSDB", {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
app.use(express.static("public")); // allows inclusion of static files(css stylesheet). these files are not sent from our servers because they do not change.
app.use(bodyParser.urlencoded({extended:true})); //necessary to be able to retrieve user input from a form/post request.
app.set('view engine', 'ejs'); //necessary to use embedded javascript(ejs)


const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("user",userSchema);

app.get("/",function(req,res){
	res.render("index");
});


app.post("/register",function(req,res){
	//res.render("index");
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash
    });
    newUser.save(function(err){
      if(err){
        console.log("there was an error in registering user" + err);
      }
      else{
        res.render("index");
      }
    });
});
});
app.post("/login",function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email: username}, function(err, foundUser){
    if(err){
      console.log("there was an error in loggin in" + err);
    }
    else if(foundUser){
      bcrypt.compare(password, foundUser.password, function(err, result) {
            if(result === true){
              res.render("index");
            }
      });
    }
    else{
      console.log("can't login no such user");
    }
  });
});






app.listen(3000,function(){
	console.log("listening on port 3000");
})
