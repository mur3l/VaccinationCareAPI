const { db } = require("../db");
const Utilities = require("./Utilities");
const UUID = require("uuid");

exports.create = async (req, res) => {
    const { ClientID, ClinicID, Date } = req.body;

    if (!ClientID || !ClinicID || !Date) {
        return res.status(400).send({
            error: "Missing required parameters."
        });
    }

    const newAppointment = await db.appointments.create({
        AppointmentID: UUID.v7(),
        ClientID,
        ClinicID,
        Date
    });

    return res
        .location(`${Utilities.getBaseURL(req)}/appointments/${newAppointment.AppointmentID}`)
        .status(201)
        .json(newAppointment);
};
