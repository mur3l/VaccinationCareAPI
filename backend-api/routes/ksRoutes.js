const VaccinationController = require("../controllers/VaccinationController")
const ClientController = require("../controllers/ClientControllers")

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

    app.route("/appointments")
        .get(AppointmentController.getAll)
        .post(AppointmentController.create);

    app.route("/appointments/:AppointmentID")
        .get(AppointmentController.getById)
        .put(AppointmentController.modifyById)
        .delete(AppointmentController.deleteById);
}
