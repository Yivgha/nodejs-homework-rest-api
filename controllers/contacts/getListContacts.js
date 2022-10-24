const { Contact } = require("../../models/contacts");

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite} = req.query;
  const skip = (page - 1) * limit;
  
  if (favorite) {
    const contacts = await Contact.find({ owner, favorite }, "-createdAt -updatedAt -_id", { skip, limit })
      .populate("owner", "email -_id");;
    res.status(200).json(contacts);
  }
  
  const result = await Contact.find({ owner }, "-createdAt -updatedAt -_id", { skip, limit })
    .populate("owner", "email subscription -_id");
  res.status(200).json(result);
};

module.exports = getListContacts;