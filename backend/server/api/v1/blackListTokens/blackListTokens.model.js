
const mongoose = require("mongoose");

const BlackListTokensSchema = new mongoose.Schema({
    access_token: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('blackListTokens', BlackListTokensSchema);




