const {DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Vaccination = sequelize.define(
        'Vaccine', {
            VaccineID: {
                type: DataTypes.UUID,
                primaryKey: true,
                autoIncrement: true,
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }
    )
    console.log(Vaccination === sequelize.models.Vaccination);
    return Vaccination;
}