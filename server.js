const
  Reservation = require("./lib/Reservation"),
  WaitingList = require("./lib/WaitingList"),
  express = require("express"),
  path = require("path"),
  fs = require("fs")

const
  app = express(),
  PORT = 3000

const
  reservations = new Reservation(),
  waitinglist = new WaitingList()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))


app.get("/", function(req, res) {
  res.sendFile(getPagePath("index"))
});

app.get("/:page", function(req, res) {
  const
    pageName = req.params.page,
    filepath = getPagePath(pageName)

  if (fs.existsSync(filepath)) {
    res.sendFile(filepath)
  } else {
    res.sendFile(getPagePath("index"))
  }
})

app.get("/api/tables", function(req, res) {
  res.json(reservations.get())
})

app.get("/api/waitlist", function(req, res) {
  res.json(waitinglist.get())
})

app.post("/api/reserve", function(req, res) {
  const reservation = req.body

  if (reservations.count() < 5) {
    reservations.add(reservation)
    res.json(true)
  } else {
    waitinglist.add(reservation)
    res.json(false)
  }
})

app.post("/api/clear", function(req, res) {
  reservations.clear()
  waitinglist.clear()
  res.json(true)
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT)
})

function getPagePath(pageName) {
  return path.join(__dirname, `/pages/${pageName}.html`)
}
