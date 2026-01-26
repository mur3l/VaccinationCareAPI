const { db } = require("../db");
const Utilities = require("./Utilities");
const { v4: uuidv4 } = require("uuid");

const getAppointment = async (req, res) => {
    try {
        const appointment = await db.appointment.findByPk(req.params.AppointmentID);
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
  // NB: kasuta täpselt neid key nimesid, mis su modelis/Swaggeris on
  const required = ["ClinicID", "ClientID", "Date", "VaccineID"];

  for (const k of required) {
    if (!req.body[k]) {
      return res.status(400).json({ error: `Missing parameter: ${k}` });
    }
  }

  try {
    const newAppointment = {
      AppointmentID: uuidv4(),
      ClinicID: req.body.ClinicID,
      ClientID: req.body.ClientID,
      Date: req.body.Date,
      VaccineID: req.body.VaccineID,
    };

    const created = await db.appointment.create(newAppointment);

    return res
      .status(201)
      .location(`${Utilities.getBaseURL(req)}/appointments/${created.AppointmentID}`)
      .json(created);

  } catch (err) {
    console.error("Error creating appointment:", err);
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
        const appointments = await db.appointment.findAll();
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