var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: false
    },
});
userSchema.pre('save', function (next){
    var user = this;
    bcrypt.hash(user.password, 10, function (error,hash){
        if(error){
            return next(error);
        }
        user.password = hash;
        next();
    });
});

//authenticate user
userSchema.statics.authenticate = function(username, password, callback) {
    User.findOne({username: username})
        .exec(function (error, user){
            if(error){
                return callback(error);
            }
            else if (!user){
                var err = new Error('Kullanıcı bulunamadı.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (error, result){
                if(result===true){
                    return callback(null,user);
                }
                else{
                    return callback();
                }
            });
        });
};
//hash password
var User = mongoose.model('User', userSchema);
module.exports = User;