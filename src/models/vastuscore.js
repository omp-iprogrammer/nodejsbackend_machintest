const mongoose = require('mongoose');
const validator = require('validator')


const VastuScoreSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
        
    },
    direction: {
        type: String,
        required: true
        
    },
    appScore: {
        type: Number,
        required: true
        
    },
    appCompliance: {
        type: String,
        required:true
    }

},{
    timestamps: true
});


const Vastu = mongoose.model('Vastu', VastuScoreSchema)

module.exports = Vastu