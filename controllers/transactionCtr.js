const Transaction = require('../models/Transaction')

// @desc Get all transactions
//@route GET /api/v1/transactions
//@access Public
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find()
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
            loading: false,
            Loading: false
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc Add transaction
//@route POST /api/v1/transactions
//@access Public
exports.addTransaction = async (req, res, next) => {
    try {
        const {name, amount, category, date} = req.body
        const transaction = await Transaction.create(req.body)
        return res.status(201).json({
            success: true,
            data: transaction,
            loading: false,
            added: true
            
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            //const messages = Object.values(err.errors).map(val => val.message)
            return res.status(400).json({
                success: false
                // error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
    

}

// @desc Delete transaction
//@route POST /api/v1/transactions/:id
//@access Public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id)

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: "No transaction found"
            })
        }

        await transaction.remove()

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

exports.updateTransaction = async (req, res, next) => {
    try {
        await Transaction.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date
        })
        return res.status(200).json({
            success: true,
            loading: false,
            error: false
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}