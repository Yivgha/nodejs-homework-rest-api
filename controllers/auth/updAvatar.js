const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempDir, originalName } = req.file;
    if (!req.file) {
        res.send("Please upload your file");
    }
    const extension = originalName.split(".").pop();
    const filename = `${_id}.${extension}`;

    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempDir, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL } );
    
    res.status(200).json({
        avatarURL,
    });
};

module.exports = updAvatar;