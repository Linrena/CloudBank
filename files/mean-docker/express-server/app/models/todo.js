var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Todo', {
    name: {
        type: String,
        default: ''
    },

    code: {
        type: String,
        default: ''
    },

    value:{
        type: Number,
        default:0
    }


});
