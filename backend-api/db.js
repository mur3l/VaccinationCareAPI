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
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            connectTimeout: 10000
        }
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

db.sync = async () => {
    await sequelize.sync({ alter: true });
    console.log("DB sync has been completed");
};

module.exports = db;
