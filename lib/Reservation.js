const
  ListDatabase = require("./ListDatabase")

class Reservation extends ListDatabase {
  constructor() {
    const databasePath = path.join(__dirname, "../data/reservations.json")
    super(databasePath)
  }
}

module.exports = Reservation