const express = require("express")
const db = require("./data/db")

const app = express()
app.use(express.json())

app.post("/api/users", (req, res) => {
  const { name, bio } = req.body
  const now = new Date()
  if (name == null || bio == null) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    })
  } else {
    db.insert({
      name,
      bio,
      created_at: now,
      updated_at: now
    })
      .then(({ id }) => {
        res.status(201).json({
          id,
          name,
          bio,
          created_at: now,
          updated_at: now
        })
      })
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        })
      })
  }
})

app.listen(4000, () => {
  console.log("\n** API up and running on port 4000 **")
})
