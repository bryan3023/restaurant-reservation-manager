const
  ListDatabase = require("./ListDatabase")

class WaitingList extends ListDatabase {
  constructor() {
    const databasePath = path.join(__dirname, "../data/waitingList.json")
    super(databasePath)
  }
}

module.exports = WaitingList