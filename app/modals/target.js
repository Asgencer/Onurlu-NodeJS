var mongoose = require('mongoose');
var targetSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
        trim: true
    },
    sololda: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    solomda: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    ankastrelda: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    ankastremda: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    cp1: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    cp2: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    iron: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    vcleaner: {
        type: Number,
        required: true,
        unique: false,
        trim: false
    },
});
targetSchema.pre('save', function (next){
    next();
});

var target = mongoose.model('Target', targetSchema);
module.exports = target;