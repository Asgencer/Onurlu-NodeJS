var mongoose = require('mongoose');
var stockSchema = mongoose.Schema({
    productCode : {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    type: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    toplam: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    ozelIdare: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    kipa: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    Teshir: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    }
});
stockSchema.pre('save', function (next){
    next();
});
var stockList = mongoose.model('Stocks', stockSchema);
module.exports = stockList;