const { db } = require("../db");
const Utilities = require("./Utilities");

exports.newSession = async (req, res) => {
    console.log('=== NEW SESSION REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body));
    console.log('LoginEmail:', req.body.LoginEmail);
    console.log('LoginPassword exists:', !!req.body.LoginPassword);
    console.log('LoginPassword length:', req.body.LoginPassword?.length);
    
    if (!req.body.LoginEmail || !req.body.LoginPassword) {
        console.log('MISSING PARAMETERS DETECTED');
        console.log('Has LoginEmail:', !!req.body.LoginEmail);
        console.log('Has LoginPassword:', !!req.body.LoginPassword);
    }
    
    console.log('Looking for client with email:', req.body.LoginEmail);
    
    try {
        let clientToProvideSessionFor;
        try {
            clientToProvideSessionFor = await db.clients.findOne({ 
                where: { EmailAddress: req.body.LoginEmail } 
            });
        } catch (dbError) {
            console.log('db.clients failed, trying db.client');
            clientToProvideSessionFor = await db.client.findOne({ 
                where: { EmailAddress: req.body.LoginEmail } 
            });
        }
        
        console.log('Client found:', !!clientToProvideSessionFor);
        
        if (!clientToProvideSessionFor) {
            console.log('CLIENT NOT FOUND IN DATABASE');
            return res.status(404).send({ error: "Client not found" });
        }
        
        console.log('Client data:', {
            ClientID: clientToProvideSessionFor.ClientID,
            EmailAddress: clientToProvideSessionFor.EmailAddress,
            HasPasswordHash: !!clientToProvideSessionFor.PasswordHASH,
            PasswordHashStart: clientToProvideSessionFor.PasswordHASH?.substring(0, 20)
        });
        
    } catch (error) {
        console.error('Session creation error:', error);
        console.error('Error stack:', error.stack);
        return res.status(500).send({ error: "Internal server error", details: error.message });
    }
};

//As an app developer, I want to authenticat a valid existing Session. for any User that authenticates Branch
exports.reauthenticate = 
  async (req, res) => {
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