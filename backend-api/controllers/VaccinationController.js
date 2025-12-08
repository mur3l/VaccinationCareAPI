const db = require("../db");
const Utilities = require("./Utilities")
const UUID = require("uuid")

exports.getAll = async (req, res) => {
    try {
        const vaccinations = await db.vaccination.findAll();

        res.status(200).json(
            vaccinations.map(v => ({
                VaccineID: v.VaccineID,
                Name: v.Name,
                Description: v.Description
            }))
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getByID = async (req, res) => {
    const vaccination = await getVaccination(req, res);
    if (!vaccination) {return res.status(404).send({error: 'Vaccination not found.'})}
}

exports.create = 
async (req,res) => {
    if (
        !req.body.Name ||
        !req.body.Description ||
        !req.body.Clinic ||
        !req.body.Appointment ||
        !req.body.Location ||
        !req.body.BestBefore
    ){
        return res.status(400).send({error: 'Missing some parameter, please review your request data.'})
    }

    const newVaccine = {
        VaccineID: UUID.v7(),
        Name: req.body.Name,
        Description: req.body.Description,
        Clinic: req.body.Clinic,
        Appointment: req.body.Appointment,
        Location: req.body.Location,
        BestBefore: req.body.BestBefore
    }

    const createdVaccine = await db.vaccination.create(newVaccine);
    return res
    .location(`${Utilities.getBaseURL(req)}/vaccinations/${createdVaccine.VaccineID}`).sendStatus(201);
}

exports.deleteById = 
async (req, res) => {
    const vaccineToBeDeleted = await getVaccination(req,res);
    if (!vaccineToBeDeleted) 
        {
            return;
        }
    await vaccineToBeDeleted.destroy();
    res.status(204).send({error: "No Content"})
}

exports.modifyById = 
async (req, res) => {
    const vaccineToBeChanged = await getVaccination(req, res);
    if (vaccineToBeChanged) {
        return;
    }

    if (
        !req.body.Name ||
        !req.body.Description ||
        !req.body.Clinic ||
        !req.body.Appointment ||
        !req.body.Location ||
        !req.body.BestBefore
    ){
        return res.status(400).send({error: 'Missing some parameter, please review your request data.'})
    }

    vaccineToBeChanged.Name = req.body.Name;
    vaccineToBeChanged.Description = req.body.Description;
    vaccineToBeChanged.Clinic = req.body.Clinic;
    vaccineToBeChanged.Appointment = req.body.Appointment;
    vaccineToBeChanged.Location = req.body.Location;
    vaccineToBeChanged.BestBefore = req.body.BestBefore;
    await vaccineToBeChanged.save();
    return res
    .location(`${Utilities.getBaseURL(req)}/vaccinations/${vaccineToBeChanged.VaccineID}`).sendStatus(201)
    .send(vaccineToBeChanged);
}

const getVaccination = async (req, res) => {
    const idNumber =req.params.VaccineID;
    if(isNaN(idNumber)) {
        res.status(400).send({error:`Entered ID is not valid ${idNumber}`})
        return null;
    }
    const vaccination = await db.vaccinations.findByPk(idNumber);
    if(!vaccination) {
        res.status(404).send({Error: `Vaccine with this ID was not found ${idNumber}.`})
        return null;
    }
    return vaccination;
} 