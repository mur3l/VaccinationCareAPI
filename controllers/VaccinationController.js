const db = require("../db");

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

const getVaccination = async (req, res) => {
    const idNumber =req.params.VaccineID;
    if(isNaN(idNumber)) {
        res.status(400).send({error:`Entered ID is not valid ${idNumber}`})
        return null;
    }
    const vaccination = await db.vaccinations.findByPk(idNumber);
    if(!vaccination) {
        res.status(404).send({Error: `Film with this ID was not found ${idNumber}.`})
        return null;
    }
    return vaccination;
}