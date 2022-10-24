const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSaveErrors = require("../helpers/handleSaveErrors");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema({
email: {
    type: String,
    match: emailRegexp,
    required: [true, "Email is required"],
    unique: true,
    },

password: {
    type: String,
    minlength: [6, "Must be at least 6 symbols"],
    required: [true, "Set password for user"],
  },

subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
    token: {
        type: String,
        default: "",
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const updSubscription = Joi.object({
    subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const schemas = {
    registerSchema,
    loginSchema,
    updSubscription,
};

const User = model("user", userSchema);

module.exports = {
    schemas,
    User,
};