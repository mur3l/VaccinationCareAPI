const VaccinationController = require("../controllers/VaccinationController")

module.exports = (app) => {
    app.route("/vaccinations")
    .get(VaccinationController.getAll)
    .post(VaccinationController.create)
     app.route("/vaccinations/:VaccineID")
    .get(VaccinationController.getByID)
    .delete(VaccinationController.deleteById)
    .put(VaccinationController.modifyById)
    
    app.route("/client")
    .post(ClientController.create)
    .get(ClientController.getAll)
    .put(ClientController.modifyById);
}
