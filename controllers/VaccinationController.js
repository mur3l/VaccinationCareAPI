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
