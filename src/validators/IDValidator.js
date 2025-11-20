const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("ID fornecido não é um ObjectId válido.");
    err.status = 400;
    return next(err);
  }
  return next();
};
