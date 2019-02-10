const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Lab',{ useNewUrlParser: true });

module.exports = {mongoose};