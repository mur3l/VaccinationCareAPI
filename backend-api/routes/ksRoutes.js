const VaccinationController = require("../controllers/VaccinationController");
const ClientController = require("../controllers/ClientController");
const AppointmentController = require("../controllers/AppointmentController");

module.exports = (app) => {
    // Vaccination routes
    app.route("/vaccination")
        .get(VaccinationController.getAll)
        .post(VaccinationController.create);
    
    app.route("/vaccination/:VaccineID")
        .get(VaccinationController.getByID)
        .delete(VaccinationController.deleteById)
        .put(VaccinationController.modifyById);

    // Client routes
    app.route("/client")
        .get(ClientController.getAllClients)
        .post(ClientController.create);
    
    app.route("/client/:ClientID")
        .get(ClientController.getbyID);

    app.route("/auth/:LoginEmail")
        .get(ClientController.getByEmail);

    // Appointment routes
    app.route("/appointments")
        .get(AppointmentController.getAll)
        .post(AppointmentController.create);

    app.route("/appointments/:AppointmentID")
        .get(AppointmentController.getById)
        .put(AppointmentController.modifyById)
        .delete(AppointmentController.deleteById);
};