const {db} = require ('../db');
const Vaccination = require('../models/Vaccination');
const utilities = require ('./Utilities')

exports.getAll = async (req, res) => {
    const vaccinations = await db.files.findAll();
    console.log("getAll: "+vaccinations)
    res
    .status(200)
    .send(FileSystem.map(({VaccinationID, Name}) => {return{VaccinationID, Name}}))
}