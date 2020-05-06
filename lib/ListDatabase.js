const fs = require("fs")

class ListDatabase {
  constructor(databasePath) {
    this.database = []
    this.databasePath = databasePath
    this.loadDatabase()
  }

  add(item) {
    this.database.push(item)
    this.saveDatabase()
  }

  get() {
    return this.database
  }

  count() {
    return this.database.length
  }

  clear() {
    this.database = []
    this.saveDatabase()
  }

  // -- Private methods ---

  /*
    Load the database from storage.
   */
  loadDatabase() {
    fs.readFile(this.databasePath, (error, data) => {
      if (error) {
        return console.error("Unable to load database.")
      }
      this.database = JSON.parse(data)
      console.log(this.database)
    })
  }


  /*
    Save the database back to the file.
   */
  saveDatabase() {
    fs.writeFile(this.databasePath, JSON.stringify(this.database), (error) => {
      if (error) {
        return console.error("Unable to save database.")
      }
    })
  }
}

module.exports = ListDatabase