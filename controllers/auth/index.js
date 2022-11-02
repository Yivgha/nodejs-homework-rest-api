const register = require("./register");
const verify = require("./verify");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const changeSubscription = require("./changeSubscription");
const updAvatar = require("./updAvatar");
const resendEmail = require("./resendEmail");


module.exports = {
    register,
    verify,
    resendEmail,
    login,
    getCurrent,
    logout,
    changeSubscription,
    updAvatar,
}