const VaccinationController = require("../controllers/VaccinationController")

module.exports = (app) => {
    app.route("/vaccinations")
    .get(VaccinationController.getAll)
    app.route("/vaccinations/:VaccineID")
    .get(VaccinationController.getByID)
}