const { use } = require("../db.js");
const Utilities = require("./Utilities.js")



//As an app developer, I want to authenticat a valid existing Session. for any User that authenticates Branch
exports.reauthenticate =
async (req.res) => {
    if(!req.session.ClientID) {
        return res.status(401).send({error:"Session expired, please log in again."})
    }
    var client = await db.clients.findByPk(req.session.ClientID)
    if(!client)
    {
    return res.status(401).send({message:"Logged in client not found, please log in again."})
    }
    return res.status(200).sed({
        ClientID : client.ClientID,
        DisplayName : client.DisplayName,
        EmailAddress : client.EmailAddress,
        IsAdmin : client.IsAdmin
    })
}

exports.removeSession = 
async (req,res) => {
    if(!req.session) {
        return res.status(401).send({error:"User is not logged in"})
    }

    req.session.destroy(
        err => {
            if (err) return res.status(500).send({error:"Server error, please hold."})
        }
    )

    res.clearCookie("connect.sid")
    res.status(200).send({ok:true})
}