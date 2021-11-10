const express = require("express");
const util = require("util");
const bodyParser = require("body-parser");
const ejs = require("ejs"); //required to embedd javascript. In other words, dynamically change html by sending data from server and filling in an html template
const app = express();
app.use(express.static("public")); // allows inclusion of static files(css stylesheet). these files are not sent from our servers because they do not change.
app.use(bodyParser.urlencoded({extended:true})); //necessary to be able to retrieve user input from a form/post request.
app.set('view engine', 'ejs'); //necessary to use embedded javascript(ejs)

app.get("/",function(req,res){
	res.render("index");
});

app.listen(3000,function(){
	console.log("listening on port 3000");
})
