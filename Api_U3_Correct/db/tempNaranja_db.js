const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TempSchema = Schema({
    NoCo: String,
    Temp: String,
    Date: {type: Date, default: Date()}
});

module.exports = mongoose.model('temperatura', TempSchema);