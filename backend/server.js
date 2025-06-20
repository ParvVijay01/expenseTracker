import express from 'express'
import dotenv from "dotenv"
import { sql } from "./config/db.js"
import rateLimiter from './middleware/rateLimiter.js'
import transactionsRoute from "./routes/transactionsRoutes.js"


dotenv.config()

const app = express()

const port = process.env.PORT || 5001

//middleware
app.use(express.json())
app.use(rateLimiter)

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log("DB initialised successfullly");
        
    } catch (error) {
        console.log("Error initialising the DB", error);
        process.exit(1) // status code 1 means failure, 0 success
    }
}

app.get("/", (req,res) => {
    res.send("Hey")
})

app.use("/api/transactions", transactionsRoute)

initDB().then(() => {
    app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
})
})