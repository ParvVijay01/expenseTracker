import express from "express"

import { getTransactionByUserId, createTransaction, deleteTransaction, expenseSummary } from "../controllers/transactionController.js"

const router = express.Router()

router.get("/:userId", getTransactionByUserId)

router.post("/", createTransaction)

router.delete("/:id", deleteTransaction)

router.get("/summary/:userId", expenseSummary)

export default router