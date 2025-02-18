const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    throw RequestError(404, "Missing field favorite");
  }
  res.status(200).json(result);
};

module.exports = updateStatusContact;