import { neon } from "@neondatabase/serverless"
import "dotenv/config"

// Creates a sql connection using our db url
export const sql = neon(process.env.DATABASE_URL)

export async function initDB() {
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

