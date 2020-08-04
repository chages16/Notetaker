var fs = require("fs");
module.exports = function (app) {
  // Setup notes variable
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    // Store the contents of the db.json file in a variable for better performance
    var notes = JSON.parse(data);

    // API ROUTES
    // ========================================================

    // Setup the /api/notes get route
    app.get("/api/notes", function (req, res) {
      // Read the db.json file and return all saved notes as JSON.
      res.json(notes);
    });

    // Setup the /api/notes post route
    app.post("/api/notes", function (req, res) {
      // Receives a new note, adds it to db.json, then returns the new note
      let newNote = req.body;
      notes.push(newNote);
      updateDb();
      return console.log("New Note Created " + newNote.title);
    });

    // Retrieves a note with specific id
    app.get("/api/notes/:id", function (req, res) {
      // display json for the notes array indices of the provided id
      res.json(notes[req.params.id]);
    });

    // Deletes a note with specific id
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      updateDb();
      console.log("Deleted note: " + req.params.id);
    });

    //updates the json file whenever a note is added or deleted
    function updateDb() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};
