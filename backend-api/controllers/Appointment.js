const { db } = require("../db");
const Utilities = require("./Utilities");
const UUID = require("uuid");

exports.getAll = async (req, res) => {
    try {
        const appointments = await db.appointments.findAll();
        res.status(200).json(
            appointments.map(a => ({
                AppointmentID: a.AppointmentID,
                ClientID: a.ClientID,
                ClinicID: a.ClinicID,
                Date: a.Date
            }))
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    const appointment = await getAppointment(req, res);
    if (!appointment) return;
    res.status(200).json(appointment);
};

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

exports.modifyById = async (req, res) => {
    const appointment = await getAppointment(req, res);
    if (!appointment) return;

    const { ClientID, ClinicID, Date } = req.body;

    if (!ClientID || !ClinicID || !Date) {
        return res.status(400).send({
            error: "Missing required parameters."
        });
    }

    appointment.ClientID = ClientID;
    appointment.ClinicID = ClinicID;
    appointment.Date = Date;

    await appointment.save();

    res.status(201).json(appointment);
};

exports.deleteById = async (req, res) => {
    const appointment = await getAppointment(req, res);
    if (!appointment) return;

    await appointment.destroy();
    res.status(204).send();
};

const getAppointment = async (req, res) => {
    const id = req.params.AppointmentID;

    const appointment = await db.appointments.findByPk(id);
    if (!appointment) {
        res.status(404).send({
            error: `Appointment with ID ${id} not found.`
        });
        return null;
    }
    return appointment;
};