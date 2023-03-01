const express = require("express")
const {db} = require("./db")
const userRouter = require("./routes/user")
const showRouter = require("./routes/show")
const app = express()

const port = 3000

app.use("/users", userRouter)
app.use("/shows", showRouter)

app.listen(port, async function() {
    await db.sync()
    console.log(`Your Server is running on: http://localhost:${port}/shows`)
    console.log(`Your Server is running on: http://localhost:${port}/users`)
})