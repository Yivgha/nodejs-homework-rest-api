const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempDir, originalname } = req.file;
    if (!req.file) {
        res.send("Please upload your file");
    }
    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempDir, resultUpload);

    Jimp.read(resultUpload)
        .then(image => {
            return image.resize(250, 250).write(resultUpload)
        })
        .catch(err => {
            console.log(err);
        });

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL } );
    
    res.status(200).json({
        avatarURL,
    });
};

module.exports = updAvatar;