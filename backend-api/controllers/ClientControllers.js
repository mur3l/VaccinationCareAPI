const {db} = require('../db')
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.create =
async (req,res) => {
    if (
        !req.body.FullName ||
        !req.body.EmailAddress ||
        !req.body.PasswordHASH ||
        !req.body.DisplayName 
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