module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define(
        "appointments",
    {
        AppointmentID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        ClientID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            ClinicID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            Date: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            tableName: "appointments",
            timestamps: true
        }
    );

    return Appointment;
};