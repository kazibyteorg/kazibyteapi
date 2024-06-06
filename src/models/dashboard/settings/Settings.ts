import {Schema, model} from 'mongoose'



const settingsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
})


const Setting = model('Setting', settingsSchema)

export default Setting;