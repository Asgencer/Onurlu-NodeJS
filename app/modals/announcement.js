var mongoose = require('mongoose');
var announcementSchema = mongoose.Schema({
    header: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    body: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
});
announcementSchema.pre('save', function (next){
    next();
});
var announcement = mongoose.model('Announcement', announcementSchema);
module.exports = announcement;