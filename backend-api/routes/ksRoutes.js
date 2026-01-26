const VaccinationController = require("../controllers/VaccinationController");
const ClientController = require("../controllers/ClientController");
const AppointmentController = require("../controllers/AppointmentController");
const SessionsController = require("../controllers/SessionsController");

module.exports = (app) => {
  app.route("/vaccination")
    .get(VaccinationController.getAll)
    .post(VaccinationController.create);

  app.route("/vaccination/:VaccineID")
    .get(VaccinationController.getByID)
    .delete(VaccinationController.deleteById)
    .put(VaccinationController.modifyById);

  app.route("/appointments")
    .get(AppointmentController.getAll)
    .post(AppointmentController.create);

  app.route("/appointments/:AppointmentID")
    .get(AppointmentController.getById)
    .put(AppointmentController.modifyById)
    .delete(AppointmentController.deleteById);

  app.route("/client")
    .get(ClientController.getAllClients)
    .post(ClientController.create);

  app.route("/client/:ClientID")
    .get(ClientController.getbyID);

  app.route("auth/logout")
    .get(SessionsController.removeSession)
    
  app.route("/auth/:LoginEmail")
    .get(ClientController.getByEmail);

  app.route("/sessions")
    .post(SessionsController.newSession);

  app.route("/sessions/me")
    .get(SessionsController.reauthenticate);

  app.route("/auth/logout")
    .get(SessionsController.removeSession);
};
