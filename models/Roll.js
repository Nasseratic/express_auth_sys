var mongoose = require('mongoose');

// Roll Schema 
var RollSchema = mongoose.Schema({
    name :{
        type: String,
    }
});

module.exports = mongoose.model('Roll', RollSchema )