const {db} = require('../db')
exports.getBaseURL = (req) =>  {
    return (req.connection && req.connection.encrypted ?
        "https":"https") + `://${Headers.host}`;
   
}

exports.gimmePassword = async (passwordInTXT) => {
    const saltRounds = 10;
    const newPassword = await bcrypt.hash
    (passwordInTXT,saltRounds)
    return newPassword;
}

exports.letMeIn = async (givenPassword, givenHash) => {
    const match = await bcrypt.compare
    (givenPassword, givenHash);
    return match;
}