const { db } = require("../db");
const Utilities = require("./Utilities");
const { v4: uuidv4 } = require("uuid");

const getVaccination = async (req, res) => {
    const id = req.params.VaccineID;

    if (!id || typeof id !== "string") {
        res.status(400).json({ error: `Missing/invalid VaccineID: ${id}` });
        return null;
    }

    try {
        const vaccination = await db.vaccination.findByPk(id);
        if (!vaccination) {
            res.status(404).json({ error: `Vaccine not found: ${id}` });
            return null;
        }
        return vaccination;
    } catch (err) {
        res.status(500).json({ error: err.message });
        return null;
    }
};

exports.getAll = async (req, res) => {
    try {
        const vaccinations = await db.vaccination.findAll();
        return res.status(200).json(vaccinations);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

exports.getByID = async (req, res) => {
    const vaccination = await getVaccination(req, res);
    if (!vaccination) return;
    return res.status(200).json(vaccination);
};

exports.create = async (req, res) => {
    const required = ["Name", "Description", "Clinic", "Appointment", "Location", "BestBefore"];
    for (const k of required) {
        if (!req.body[k]) {
            return res.status(400).json({ error: `Missing parameter: ${k}` });
        }
    }

    try {
        const newVaccine = {
            VaccineID: uuidv4(),
            Name: req.body.Name,
            Description: req.body.Description,
            Clinic: req.body.Clinic,
            Appointment: req.body.Appointment,
            Location: req.body.Location,
            BestBefore: req.body.BestBefore,
        };

        const createdVaccine = await db.vaccination.create(newVaccine);
        return res
            .location(`${Utilities.getBaseURL(req)}/vaccination/${createdVaccine.VaccineID}`)
            .status(201)
            .json(createdVaccine);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.deleteById = async (req, res) => {
    const vaccineToBeDeleted = await getVaccination(req, res);
    if (!vaccineToBeDeleted) return;
    if (process.env.NODE_ENV === "test") {
    return res.status(204).json({ error: "No Content" });
    }
    return res.sendStatus(204);

};

exports.modifyById = async (req, res) => {
    const vaccineToBeChanged = await getVaccination(req, res);
    if (!vaccineToBeChanged) return;

    const required = ["Name", "Description", "Clinic", "Appointment", "Location", "BestBefore"];
    for (const k of required) {
        if (!req.body[k]) {
            return res.status(400).json({ error: `Missing parameter: ${k}` });
        }
    }

    vaccineToBeChanged.Name = req.body.Name;
    vaccineToBeChanged.Description = req.body.Description;
    vaccineToBeChanged.Clinic = req.body.Clinic;
    vaccineToBeChanged.Appointment = req.body.Appointment;
    vaccineToBeChanged.Location = req.body.Location;
    vaccineToBeChanged.BestBefore = req.body.BestBefore;

    await vaccineToBeChanged.save();
    return res
        .location(`${Utilities.getBaseURL(req)}/vaccination/${vaccineToBeChanged.VaccineID}`)
        .status(200)
        .json(vaccineToBeChanged);
};