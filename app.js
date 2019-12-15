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
  url:  "https://us18.api.mailchimp.com/3.0/lists/7f68043477",
  method: "POST",
  headers: {
  "Authorization":"millerose23 c4edfb0962659e705a60185a69ed774b-us18 "
},
  body: jsonData
};

request(options, function(error, response, body){
if (error){
  res.sendFile(__dirname + "/failure.html");
} else {
  if (response.statusCode == 200)
  {
    res.sendFile(__dirname + "/sucess.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }
}
});
});
app.post("failure", function(req,res){
  res.redirect("/");
});

//local or dynamic
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running");
});
