const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentsSchema = new Schema ({
    name: {
        type:String,
        require:true
    },
    number: {
        type:Number,
        require:true
    },
    surfLevel: {
        type:String,
        require:true
    },
    payment: {
        type:String,
        require:true
    },
    duration: {
        type:Number,
        require:true
    },
    instructor: {
        type:String,
        require:true
    },
    image: {
        type:String,
        require:false
    },
    user_id: {
        type: String,
        required: true
      }
}, {timestamps: true})

module.exports = mongoose.model('student', studentsSchema)