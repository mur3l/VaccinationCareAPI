const VaccinationController = require("../controllers/VaccinationController");

module.exports = (app) => {
    app.route("/vaccinations")
       .get(VaccinationController.getAll);
};
