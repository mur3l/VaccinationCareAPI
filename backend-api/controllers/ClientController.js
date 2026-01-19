const { db } = require('../db');
const Utilities = require('./Utilities');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    if (!password) return null;
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

exports.create = async (req, res) => {
    const { FullName, EmailAddress, PasswordHASH, PhoneNumber2FA } = req.body;

    const missing = [];
    if (!FullName) missing.push("FullName");
    if (!EmailAddress) missing.push("EmailAddress");
    if (!PasswordHASH) missing.push("PasswordHASH");

    if (missing.length) {
        return res
            .status(400)
            .json({ error: `Missing parameters: ${missing.join(', ')}` });
    }

    try {
        const newClient = {
            ClientID: uuidv4(),
            FullName,
            EmailAddress,
            PasswordHASH: await hashPassword(PasswordHASH),
            PhoneNumber2FA: PhoneNumber2FA || null
        };

        const resultingClient = await db.client.create(newClient);

        return res
            .status(201)
            .location(`${Utilities.getBaseURL(req)}/client/${resultingClient.ClientID}`)
            .json({
                message: 'Client created successfully',
                ClientID: resultingClient.ClientID
            });

    } catch (error) {
        console.error('Error creating client:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: 'Client with this EmailAddress already exists'
            });
        }

        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllClients = async (_req, res) => {
    try {
        const clients = await db.client.findAll({
            attributes: ['ClientID', 'FullName', 'EmailAddress', 'PhoneNumber2FA']
        });
        res.json(clients);
    } catch (error) {
        console.error('Error getting clients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getbyID = async (req, res) => {
    try {
        const client = await db.client.findByPk(req.params.ClientID);
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
        const client = await db.client.findOne({
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