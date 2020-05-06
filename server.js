const
  express = require("express"),
  path = require("path"),
  fs = require("fs")

const
  app = express(),
  PORT = 3000

const
  reservations = [],
  waitinglist = []

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", function(req, res) {
  res.sendFile(getPagePath("index"))
});

app.get("/:page", function(req, res) {
  const pageName = req.params.page,
    filepath = getPagePath(pageName)

  if (fs.existsSync(filepath)) {
    res.sendFile(filepath)
  } else {
    res.sendFile(getPagePath("index"))
  }
})

app.get("/api/tables", function(req, res) {
  res.send("see tables")
})

app.get("/api/waitlist", function(req, res) {
  res.sendFile(path.join(__dirname,"view.html"))
})

app.post("/api/reserve", function(req, res) {

})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT)
})

function getPagePath(pageName) {
  return path.join(__dirname, `/pages/${pageName}.html`)
}