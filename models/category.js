const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

/**
 * Set virtuals true to show json stringify as response
 */
categorySchema.set('toObject', { virtuals: true })
categorySchema.set('toJSON', { virtuals: true })

/**
 * use virtual to virtually refer product model
 */
categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'cat_id'
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category