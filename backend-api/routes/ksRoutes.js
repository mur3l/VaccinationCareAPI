const VaccinationController = require("../controllers/VaccinationController");
const ClientController = require("../controllers/ClientControllers");
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

  // Clients
  app.route("/client")
    .get(ClientController.getAllClients)
    .post(ClientController.create);

  app.route("/client/:ClientID")
    .get(ClientController.getById);

  // Auth helpers / sessions
  app.route("/auth/:LoginEmail")
    .get(ClientController.getByEmail);

  app.route("/sessions")
    .post(SessionsController.newSession);

  app.route("/sessions/me")
    .get(SessionsController.reauthenticate);

  app.route("/auth/logout")
    .get(SessionsController.removeSession);
};
