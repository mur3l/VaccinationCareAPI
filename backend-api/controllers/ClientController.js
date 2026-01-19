const { db } = require('../db');
const Utilities = require('./Utilities');
const UUID = require('uuid');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    if (!password) return null;
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}

exports.create = async (req, res) => {
    const { FullName, EmailAddress, PasswordHASH, PhoneNumber2FA } = req.body;
    
    if (!FullName || !EmailAddress || !PasswordHASH) {
        let errors = [];
        if (!FullName) errors.push("FullName");
        if (!EmailAddress) errors.push("EmailAddress");
        if (!PasswordHASH) errors.push("PasswordHASH");
        return res.status(400).send({ error: `Missing parameters: ${errors.join(', ')}` });
    }
    
    try {
        const newClient = {
            UserID: UUID.v7(),
            FullName: FullName,
            EmailAddress: EmailAddress,
            PasswordHASH: await hashPassword(PasswordHASH)
        };
        
        if (PhoneNumber2FA != null && PhoneNumber2FA !== '') {
            newClient.PhoneNumber2FA = PhoneNumber2FA;
        }
        
        const resultingClient = await db.users.create(newClient);
        return res
            .location(`${Utilities.getBaseURL(req)}/client/${resultingClient.ClientID}`)
            .status(201)
            .json({ message: 'Client created successfully', id: resultingClient.ClientID });
    } catch (error) {
        console.error('Error creating client:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
};

exports.getAllClients = async (req, res) => {
    try {
        const clients = await db.users.findAll();
        res.json(clients);
    } catch (error) {
        console.error('Error getting clients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getbyID = async (req, res) => {
    try {
        const client = await db.users.findByPk(req.params.ClientID);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        console.error('Error getting client:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getByEmail = async (req, res) => {
    try {
        const client = await db.users.findOne({
            where: { EmailAddress: req.params.LoginEmail }
        });
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        console.error('Error getting client by email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};