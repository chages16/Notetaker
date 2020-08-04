var path = require("path");
module.exports = function (app) {
  // Display notes.html when /notes is accessed
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  //doublechecking html routes due to pc issues (not required code)
    app.get("/uselesstest", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // Display index.html when all other routes are accessed
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
