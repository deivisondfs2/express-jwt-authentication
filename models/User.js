import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var UserSchema = new mongoose.Schema({
    username: {
        type : 'String',
        required : true
    },
    email: {
        type : 'String',
        required: true
    },
    password: {
        type : 'String',
        required : true
    }
});


UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password,salt);
    }
    next();
});

UserSchema.methods.isPassword = (encodedPasswor, password) => {
    return bcrypt.compareSync(password, encodedPasswor);
};

module.exports = mongoose.model('User', UserSchema);
