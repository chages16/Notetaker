
var express = require("express");
var fs = require("fs");
var path = require('path');


var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static("public"));



// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Setup listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});  
console.log("http://localhost:8080/");
