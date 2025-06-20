import express from 'express'
import dotenv from "dotenv"
import { initDB } from "./src/config/db.js"
import rateLimiter from './src/middleware/rateLimiter.js'
import transactionsRoute from "./src/routes/transactionsRoutes.js"

dotenv.config()

const app = express()

const port = process.env.PORT || 5001

//middleware
app.use(express.json())
app.use(rateLimiter)

app.use("/api/transactions", transactionsRoute)

initDB().then(() => {
    app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
})
})