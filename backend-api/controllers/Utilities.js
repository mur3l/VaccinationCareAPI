const bcrypt = require("bcrypt");

exports.getBaseURL = (req) => {
  const protocol = (req && req.protocol) ? req.protocol : (req?.connection?.encrypted ? "https" : "http");
  const host = (req && typeof req.get === "function") ? req.get("host") : req?.headers?.host;
  return `${protocol}://${host}`;
};

exports.gimmePassword = async (passwordInTXT) => {
  const saltRounds = 10;
  const newPassword = await bcrypt.hash(passwordInTXT, saltRounds);
  return newPassword;
};

exports.letMeIn = async (givenPassword, givenHash) => {
  const match = await bcrypt.compare(givenPassword, givenHash);
  return match;
};
