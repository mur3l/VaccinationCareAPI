const { db } = require("../db");
const Utilities = require("./Utilities");
const UUID = require("uuid");

const getAppointment = async (req, res) => {
    try {
        const appointment = await db.appointments.findByPk(req.params.AppointmentID);
        if (!appointment) {
            res.status(404).json({ error: 'Appointment not found' });
            return null;
        }
        return appointment;
    } catch (err) {
        res.status(500).json({ error: err.message });
        return null;
    }
};

exports.create = async (req, res) => {
    const { ClientID, ClinicID, Date } = req.body;

    if (!ClientID || !ClinicID || !Date) {
        return res.status(400).send({ error: "Missing required parameters." });
    }

    try {
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
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.modifyById = async (req, res) => {
    const appointment = await getAppointment(req, res);
    if (!appointment) return;

    const { ClientID, ClinicID, Date } = req.body;
    if (!ClientID || !ClinicID || !Date) {
        return res.status(400).send({ error: "Missing required parameters." });
    }

    appointment.ClientID = ClientID;
    appointment.ClinicID = ClinicID;
    appointment.Date = Date;

    await appointment.save();
    res.status(200).json(appointment);
};

exports.getById = async (req, res) => {
    const appointment = await getAppointment(req, res);
    if (!appointment) return;
    res.status(200).json(appointment);
};

exports.getAll = async (req, res) => {
    try {
        const appointments = await db.appointments.findAll();
        res.status(200).json(appointments.map(a => ({
            AppointmentID: a.AppointmentID,
            ClientID: a.ClientID,
            ClinicID: a.ClinicID,
            Date: a.Date
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteById = async (req, res) => {
    const appointment = await getAppointment(req, res);
    if (!appointment) return;
    await appointment.destroy();
    res.status(204).send();
};