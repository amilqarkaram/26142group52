const express = require("express");
const util = require("util");
const axios = require("axios");
const bodyParser = require("body-parser");
const ejs = require("ejs"); //required to embedd javascript. In other words, dynamically change html by sending data from server and filling in an html template
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");// provides a hashing function to help store user passwords not as plain text
const saltRounds = 10;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { requireAuth } = require('./middleware/authMiddleware.js');
const path = require('path')
mongoose.connect("mongodb+srv://admin-amilqar:123hurBnomC@cluster0.rmpoy.mongodb.net/SaveTheUSDB", {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // allows inclusion of static files(css stylesheet). these files are not sent from our servers because they do not change.
app.use(bodyParser.urlencoded({extended:true})); //necessary to be able to retrieve user input from a form/post request.
app.set('view engine', 'ejs'); //necessary to use embedded javascript(ejs)
app.use(cookieParser());

const createToken = function(id){
	return jwt.sign({id},'save the world secret');
}
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("user",userSchema);

app.get("/",function(req,res){
	res.render("home",{passwordStatus:""});
});

app.get("/game/:username", requireAuth,function(req,res){
	res.render("game",{name: req.params.username});
});

app.post("/auth",function(req,res){
	//res.render("index");
	const username = req.body.username;
	const password = req.body.password;
	const authorization = req.body.authorization;
	if(authorization == "register"){
  	bcrypt.hash(password, saltRounds, function(err, hash) {
    const newUser = new User({
      username: req.body.username,
      password: hash
    });
    newUser.save(function(err){
      if(err){
        console.log("there was an error in registering user" + err);
      }
      else{
        //res.render("index");
				const token = createToken(newUser._id);
				res.cookie('jwt',token,{httpOnly: true});
				res.redirect("/game/" + username);
      }
    });
	});
	}
	else{
		User.findOne({username: username}, function(err, foundUser){
			if(err){
				console.log("there was an error in loggin in" + err);
			}
			else if(foundUser){
				console.log("hello")
				bcrypt.compare(password, foundUser.password, function(err, result) {
							if(result === true){
								const token = createToken(foundUser._id);
								res.cookie('jwt',token,{httpOnly: true});
								res.redirect("/game/" + username);
							}
							else{
									//res.render("home",{passwordStatus:"wrong password"});
							}
				});
			}
			else{
				console.log("can't login no such user");
			}
		});
	}

});






app.listen(3000,function(){
	console.log("listening on port 3000");
})
