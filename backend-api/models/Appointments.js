const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define(
        'Appointment', {
            AppoitnmentID: {
                type:DataTypes.UUID,
                primaryKey: true,
                Defaultvalue: DataTypes.UUIDV7
            },
            AppointmentNotes: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            AppointmentCost: {
                type:DataTypes.DECIMAL,
                allowNull: false
            }            
        }
  
    )

    console.log(Appointment === sequelize.models.Appointment)
    return Appointment
}