const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const OrderHistory = mongoose.model('OrderHistory', historySchema)

module.exports = OrderHistory