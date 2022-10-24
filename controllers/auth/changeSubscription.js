const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const changeSubscription = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!result) {
        throw RequestError(404);
    }
    res.status(200).json(result)
    
};

module.exports = changeSubscription;