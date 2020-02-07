const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var mail = req.body.email;

  var data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/<LIST ID>", //LIST ID REMOVIDA
    method: "POST",
    headers: {
      Authorization: "eduardo1 <API KEY>" //API KEY REMOVIDA
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/sucess.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen( process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});

