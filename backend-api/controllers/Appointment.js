const {db, appointment} = require("../db.js")
const Utilities = require('./Utilities')
const UUID = require('uuid')

exports.create = async (req, res) {
    if(!req.body.AppointmentNotes || !req.body.AppontmentCost)
    {
        return res.status(400).send({error:"You are missing appointment cost or appointment notes"})
    }
    if(!req.body.ClientID || !req.body.VaccineID) 
    {
        return res.status(404).send({error: "Client or Vaccine not found"})
    }
    let newAppointment = {
        AppointmentID: UUID.v7(),
        AppontmentCost: req.body.AppontmentCost,
        AppointmentNotes: req.body.AppointmentNotes,
        ClientID: req.body.ClientID,
        VaccineID: req.body.VaccineID
    }
    const submittedAppointment = await db.appointment.create(newAppointment);
    res
    .location(`${Utilities.getBaseURL(req)}/appointment/${submittedAppointment.AppointmentID}`).sendStatus(201);
}