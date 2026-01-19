const { db } = require("../db");
const Utilities = require("./Utilities");

exports.newSession = async (req, res) => {
    console.log('Session creation request body:', req.body);
    
    if (!req.body.LoginEmail || !req.body.LoginPassword) {
        let missingparams = "";
        if (!req.body.LoginEmail) {
            missingparams += "No email provided. ";
        }
        if (!req.body.LoginPassword) {
            missingparams += "No password provided.";
        }
        return res.status(400).send({ error: "Missing parameter for logging in: " + missingparams });
    }
    
    const LoginEmail = req.body.LoginEmail;
    console.log('Looking for client with email:', LoginEmail);
    
    try {
        const clientToProvideSessionFor = await db.clients.findOne({ 
            where: { EmailAddress: LoginEmail } 
        });
        
        if (!clientToProvideSessionFor) {
            return res.status(404).send({ error: "Client not found" });
        }
        
        // Kasuta Utilities.letMeIn funktsiooni parooli kontrolliks
        // Kui Utilities.letMeIn pole, siis tee lihtne versioon
        let isCorrect = false;
        try {
            if (Utilities.letMeIn) {
                isCorrect = await Utilities.letMeIn(req.body.LoginPassword, clientToProvideSessionFor.PasswordHASH);
            } else {
                // Lihtne versioon - võrdle otse (testimiseks)
                const bcrypt = require('bcrypt');
                isCorrect = await bcrypt.compare(req.body.LoginPassword, clientToProvideSessionFor.PasswordHASH);
            }
        } catch (err) {
            console.error('Password check error:', err);
            isCorrect = false;
        }
        
        if (!isCorrect) {
            return res.status(401).send({ error: "Password mismatch" });
        }
        
        req.session.ClientID = clientToProvideSessionFor.ClientID;
        
        return res.status(200).send({
            ClientID: clientToProvideSessionFor.ClientID,
            DisplayName: clientToProvideSessionFor.DisplayName || clientToProvideSessionFor.FullName,
            EmailAddress: clientToProvideSessionFor.EmailAddress,
            IsAdmin: clientToProvideSessionFor.IsAdmin || false
        });
        
    } catch (error) {
        console.error('Session creation error:', error);
        return res.status(500).send({ error: "Internal server error" });
    }
};

exports.reauthenticate = async (req, res) => {
    if (!req.session.ClientID) {
        return res.status(401).send({ error: "Session expired, please log in again." });
    }
    
    try {
        const client = await db.clients.findByPk(req.session.ClientID);
        if (!client) {
            return res.status(401).send({ message: "Logged in client not found, please log in again." });
        }
        
        return res.status(200).send({
            ClientID: client.ClientID,
            DisplayName: client.DisplayName || client.FullName,
            EmailAddress: client.EmailAddress,
            IsAdmin: client.IsAdmin || false
        });
        
    } catch (error) {
        console.error('Reauthentication error:', error);
        return res.status(500).send({ error: "Internal server error" });
    }
};

exports.removeSession = async (req, res) => {
    if (!req.session) {
        return res.status(401).send({ error: "User is not logged in" });
    }
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.status(500).send({ error: "Server error, please hold." });
        }
        
        res.clearCookie("connect.sid");
        return res.status(200).send({ ok: true });
    });
};