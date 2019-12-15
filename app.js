const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){

var firstname = req.body.fname;
var lastname = req.body.lname;
var email = req.body.email;

var data = {
  members: [
    {email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }
  ]
};

var jsonData = JSON.stringify(data);

var options = {
  url:  "https://us18.api.mailchimp.com/3.0/lists/listnumber",
  method: "POST",
  headers: {
  "Authorization":"username apikey"
},
  body: jsonData
};

request(options, function(error, response, body){
if (error){
  res.sendFile(__dirname + "/failure.html");
} else {
  res.sendFile(__dirname + "/sucess.html");
}
});
});
//local or server
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running");
});
