const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { v4 } = require("uuid");

const { RequestError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
       throw RequestError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = v4();
    const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken });

    const mail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`
    }

    await sendEmail(mail);

    res.status(201).json({
        user: {
            email: result.email,
            subscription: "starter",
        },
    });
};

module.exports = register;