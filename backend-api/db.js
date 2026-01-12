require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USERNAME,
  process.env.DB_USERPASS,
  {
    host: process.env.DB_HOSTNAME,
    port: 3306,
    dialect: "mariadb",
    logging: console.log,
    dialectOptions: {
      // NOTE: If your local MariaDB does NOT use SSL, comment out ssl entirely.
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      connectTimeout: 10000,
    },
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection OK");
  } catch (error) {
    console.error("Unable to connect: " + error);
  }
}
testConnection();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vaccination = require("./models/Vaccination.js")(sequelize, DataTypes);
db.client = require("./models/Client.js")(sequelize, DataTypes);
db.appointment = require("./models/Appointment.js")(sequelize, DataTypes);

// Client ↔ Appointment: 1-to-many
db.client.hasMany(db.appointment, { foreignKey: "ClientID", as: "appointments" });
db.appointment.belongsTo(db.client, { foreignKey: "ClientID", as: "client" });

// Vaccination ↔ Appointment: 1-to-many
db.vaccination.hasMany(db.appointment, { foreignKey: "VaccineID", as: "appointments" });
db.appointment.belongsTo(db.vaccination, { foreignKey: "VaccineID", as: "vaccination" });

db.sync = async () => {
  await sequelize.sync({ alter: true });
  console.log("DB sync has been completed");
};

module.exports = db;
