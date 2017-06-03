var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");



//the code used to require another schema file
// Bring in our Models: Note and User
var Note = require("./models/Note.js");
var Article = require("./models/article.js");
//havent defined yet do i need a schema for the articles..i dont think so
//var User = require("./models/User.js");


var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

//databse configuration
mongoose.connect("mongodb://heroku_p42v1285:ucm6mhblpe5rcimapq4u12hhoe@ds149221.mlab.com:49221/heroku_p42v1285");


var db = mongoose.connection;

//log any mongoose errors
db.on("error", function(error){
  console.log("Mongoose Error: ", error);
});

db.once("open", function(){
  console.log("Mongoose connection successful.")
});




//web scraping information
var request = require("request");
var cheerio = require("cheerio");

//First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from reddit main board:" +
            "\n***********************************\n");


//app.get("/scrape", function(req, res){
    // Making a request call for reddit's "webdev" board. The page's HTML is saved as the callback's third argument
  request("https://www.reddit.com", function(error, response, html) {
	 
   if(!error && response.statusCode == 200){
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var result = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $("p.title").each(function(i, element) {

    // Save the text of the element (this) in a "title" variable
    var title = $(this).text();
    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    var link = $(element).children().attr("href");

    // Save these results in an object that we'll push into the result array we defined earlier
     result.push({
       title: title,
       link: link
     });

    });

    // Log the result once cheerio analyzes each of its selected elements
    console.log(result); 
    console.log(result.length);
  }
  });






//routes...prob should go in another file/controller

//simple index route starting on the landing page
app.get("/", function(req, res){
	res.send(index.html);
});

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)
app.get("/all", function(req, res) {
  Article.find({}, function(err, data){
    // Log any errors if the server encounters one
      if (err) {
          return console.log(err);
      }
      // Otherwise, send the result of this query to the browser
      else {
          res.json(data);
      }
  }); 
});

// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?
app.get("/scrape", function(req, res) {

  request("https://www.reddit.com", function(error, response, html){

    var $ = cheerio.load(html);

    $(".title").each(function(i,element){
      
      var result = {};
      
      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      
      var entry = new Article(result);
      
      entry.save(function(err, doc){
        if(err){
          console.log(err)
        } else {
          console.log(doc);
        }
      })
    })
    res.send('scrape complete');
  });
});


//Route to post our own for submission to mongoDB via mongoose
app.post("/scrapeNews", function(req, res){
  //var user = new;
});
/* -/-/-/-/-/-/-/-/-/-/-/-/- */


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});