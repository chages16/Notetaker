var fs = require("fs");
var path = require("path")
var { v4: uuid }  = require('uuid')
module.exports = function (app) {
  app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "../db/db.json")))

 app.post("/api/notes", (req, res) => {
     var createNote ={uuid:uuid(),title:req.body.title,text:req.body.text};
     console.log(createNote)
     var prevNote =JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf-8")) 
     prevNote.push(createNote)
     fs.writeFileSync("./db/db.json",JSON.stringify(prevNote))
     res.json(prevNote)
 })
 
 app.delete("/api/notes/:id", (req, res) => {
    var deleted = req.params.uuid
    console.log(deleted)
    var oldNote =JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json"),"utf-8"))
    var newNote =oldNote.filter(oldNote=>oldNote.id != deleted)
    fs.writeFileSync("./db/db.json",JSON.stringify(newNote))
    res.send(newNote)
})
}