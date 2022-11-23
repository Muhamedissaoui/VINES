const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = mongoose.Schema({
 
    reporter : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reported :{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    reason: {
        type: String 
    }
    
}, { timestamps : true })


const Report = mongoose.model('Report', reportSchema);

module.exports = { Report }