const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.create =
async (req,res) => {
    const { FullName, EmailAddress, PasswordHASH, PhoneNumber2FA } = req.body;
    if (
        !req.body.FullName ||
        !req.body.EmailAddress ||
        !req.body.PasswordHASH
    ){
       
        var errors = "";
        switch(bodycontent) 
        {
            case !req.body.FullName:
                errors+="FullName, "
                break;
            case !req.body.EmailAddress:
                errors+="EmailAddress, "
                break;
            case !req.body.PasswordHASH:
                errors+="Password, "
                break;
            default:
                break;
        }
        return res.status(400).send({error:`Missing some parameter: ${errors}`})
    }
    const newClient = {
        UserID: UUID.v7(),
        FullName: req.body.FullName,
        EmailAddress: req.body.EmailAddress,
        PasswordHASH: gimmePassword(req.body.PasswordHASH)     
    }
    
        if(req.body.PhoneNumber2FA != null){
            newClient.PhoneNumber2FA = gimmePassword(req.body.PhoneNumber2FA);}
    
    const resultingClient = await db.users.create(newClient);
    return res
    .location(`${Utilities.getBaseURL(req)}/client/${resultingClient.ClientID}`).sendStatus(201);
}

exports.getAll = async (req, res) => {
    try {
        const clients = await db.clients.findAll();

        res.status(200).json(
            clients.map(c => ({
                ClientID: c.client_id,
                ClientName: c.client_name,
                VaccineID: c.vaccine_id,
                AppointmentsID: c.appointments_id
            }))
        );
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.modifyById = async (req, res) => {
    const { FullName, EmailAddress, PasswordHASH, DisplayName, PhoneNumber2FA } = req.body;

    if (!FullName && !EmailAddress && !PasswordHASH && !PhoneNumber2FA) {
        return res.status(400).send({ error: "Missing required parameters" });
    }

    const client = await db.clients.findByPk(req.params.ClientID);

    if (!client) {
        return res.status(404).send({ error: "Client not found" });
    }

    const updates = {};
    if (FullName) updates.FullName = FullName;
    if (EmailAddress) updates.EmailAddress = EmailAddress;
    if (PasswordHASH) updates.PasswordHASH = await Utilities.gimmePassword(PasswordHASH);
    if (PhoneNumber2FA) updates.PhoneNumber2FA = await Utilities.gimmePassword(PhoneNumber2FA);

    await client.update(updates);

    return res.status(201).json({
        message: "Client updated successfully",
        client
    });
};

exports.deleteById = async (req, res) => {
    const client = await db.clients.findByPk(req.params.ClientID);

    if (!client) {
        return res.status(404).send({ error: "Client not found" });
    }

    await client.destroy();

    return res.status(204).send();
};

exports.getById = async (req, res) => {
    const clientId = req.params.ClientID;
    
    if (isNaN(clientId)) {
        return res.status(400).send({ error: "Invalid Client ID" });
    }

    try {
        const client = await db.clients.findByPk(clientId);

        if (!client) {
            return res.status(404).send({ error: "Client not found" });
        }

        // 200 – klient leitud
        return res.status(200).json(client);

    } catch (error) {
        // 500 – serveri viga
        return res.status(500).send({ error: "Server error" });
    }
};
