// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/timestamp",(req,res)=>{
  var date = new Date();
  res.json({
    unix:date.getTime(),
    utc:date.toUTCString()

  })
})

// your first API endpoint... 
app.get("/api/timestamp/:time",(req,res)=>{
  let value = req.params.time;
  let regex1=/^\d{4}-\d{2}-\d{2}$/;
  let regex2=/^\d+$/;
  
 
 if(regex1.test(value)){
    
    let splittedArray=value.split("-");
    
    let year = parseInt(splittedArray[0]);
    let month = parseInt(splittedArray[1]);
    let day = parseInt(splittedArray[2]);
    var date = new Date(year,month-1,day);

   
    res.json({
      unix:date.getTime(),
      utc:date.toUTCString()

    })

  }else if(regex2.test(value)){
    var date = new Date(parseInt(value));
    res.json({
      unix:date.getTime(),
      utc:date.toUTCString()
    })
  }else{
    res.json({
      error:"Invalid date"
    })
  }
 
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT ||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
