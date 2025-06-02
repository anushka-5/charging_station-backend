import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    chargingPoints: [{ // 🔗 One-to-many reference
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChargingPoint",
    }],
})

Schema.pre("save", function (next) {
    // You can add pre-save logic here, like hashing the password
    if (this.isModified("password")) {
        const SALT = process.env.SALT
        const salt = bcrypt.genSaltSync(parseInt(SALT));
        this.password = bcrypt.hashSync(this.password, salt); // Hash the password with a salt rounds of 10
    }
    next();
});

// update the password
Schema.pre("findOneAndUpdate", function (next) {
    if (this._update.password) {
        const SALT = process.env.SALT
        const salt = bcrypt.genSaltSync(parseInt(SALT));
        this._update.password = bcrypt.hashSync(this._update.password, salt); // Hash the password with a salt rounds of 10
    }
    next();
});

// Method to compare passwords
Schema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model("User", Schema);
export default User;