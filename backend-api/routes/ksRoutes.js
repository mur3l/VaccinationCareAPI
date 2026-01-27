const VaccinationController = require("../controllers/VaccinationController");
const ClientController = require("../controllers/ClientController");
const AppointmentController = require("../controllers/AppointmentController");
const SessionsController = require("../controllers/SessionsController");

function requireAuth(req, res, next) {
  if (!req.session || !req.session.ClientID) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
  next();
}

module.exports = (app) => {
  app.route("/client")
    .get(ClientController.getAllClients)
    .post(ClientController.create);

  app.route("/client/:ClientID")
    .get(ClientController.getbyID);

  app.route("/auth/:LoginEmail")
    .get(ClientController.getByEmail);

  app.route("/sessions")
    .post(SessionsController.newSession)
    .delete(SessionsController.removeSession);

  app.route("/sessions/me")
    .get(SessionsController.reauthenticate);

  app.route("/auth/logout")
    .get(SessionsController.removeSession);

  app.route("/vaccination")
    .get(requireAuth, VaccinationController.getAll)
    .post(requireAuth, VaccinationController.create);

  app.route("/vaccination/:VaccineID")
    .get(requireAuth, VaccinationController.getByID)
    .delete(requireAuth, VaccinationController.deleteById)
    .put(requireAuth, VaccinationController.modifyById);

  app.route("/appointments")
    .get(requireAuth, AppointmentController.getAll)
    .post(requireAuth, AppointmentController.create);

  app.route("/appointments/:AppointmentID")
    .get(requireAuth, AppointmentController.getById)
    .put(requireAuth, AppointmentController.modifyById)
    .delete(requireAuth, AppointmentController.deleteById);
};
