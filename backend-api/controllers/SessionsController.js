const { use } = require("../db.js");
const Utilities = require("./Utilities.js")

exports.newSession =
async (req,res) => {
    console.log(req.body)
    if (req.body.LoginEmail === undefined || !req.body.LoginPassword === undefined)
    {
        var missingparams = "";
        if(!req.body.LoginEmail)
        {
            missingparams += "No email provided.";
        }
        if(!req.body.LoginPassword)
        {
            missingparams += "No password provided.";
        }
        return res.status(400).send({error:"Missing paramteter for logging in"+missingparams})
    }
    LoginEmail = req.body.LoginEmail
    console.log(LoginEmail)
    var clientToProvideSessionFor = await db.clients.findOne({where: {EmailAddress: LoginEmail}})
    if(!clientToProvideSessionFor) {
        return res.status(404).send({error:"Client not found"})
    }
    //const newLoginHASH = (await Utilities.gimmePassword(LoginPassword)).toString()
    var isCorrect = (await Utilities.letMeIn(req.body.LoginPassword, clientToProvideSessionFor.PasswordHASH))
    if (!isCorrect)
    {
        return res.status(401).send({error: "Password mismatch"})
    }
    req.session.Client = clientToProvideSessionFor.ClientID

    return res.status(200).send({
        ClientID : clientToProvideSessionFor.ClientID,
        DisplayName : clientToProvideSessionFor.DisplayName,
        EmailAddress : clientToProvideSessionFor.EmailAddress,
        IsAdmin : clientToProvideSessionFor.IsAdmin
    })
}

//As an app developer, I want to authenticat a valid existing Session. for any User that authenticates Branch
exports.reauthenticate =
async (req, res) => {
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