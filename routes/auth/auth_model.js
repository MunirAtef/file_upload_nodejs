
const Mongoose = require('mongoose')
const bcrypt = require('bcrypt');


const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: [true, "name-not-provided"]
    },
    email: {
        type: String,
        unique: [true, "email-taken"],
        required: [true, "no-email-provided"],
    },
    password: {
        type: String,
        minlength: [6, "too-short-password"],
        required: [true, "no-password-provided"],
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    console.log(JSON.stringify(this));

    const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log(hashedPassword);

    this.password = hashedPassword;

    next();
})


const UserModel = Mongoose.model('auth', UserSchema, 'auth');
module.exports = UserModel;

