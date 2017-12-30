var mongoose = require('mongoose');

// role Schema 
var roleSchema = mongoose.Schema({
    name :{
        type: String,
    }
});

module.exports = mongoose.model('role', roleSchema )