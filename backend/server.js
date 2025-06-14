import express from 'express'
import dotenv from "dotenv"

dotenv.config()

const app = express()

const port = process.env.PORT || 5001

app.get("/", (req, res) => {
    res.send("It's working")
})

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
})