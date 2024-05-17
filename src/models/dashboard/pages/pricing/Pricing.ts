import {Schema, model} from 'mongoose'



const pricingSchema = new Schema({
    name: {
        type: ['free', 'starter', 'agency', 'enterprise'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    websiteNumber: {
        type: Number,
        required: true
    },
})