const VaccinationController = require("../controllers/VaccinationController");

module.exports = (app) => {
    app.route("vaccination")
    .get(VaccinationController.getAll)
}