module.exports = (sequelize, DataTypes) => {
    const Vaccination = sequelize.define(
        "vaccination",
        {
            VaccineID: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            Name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Clinic: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Appointment: {
                type: DataTypes.DATE,
                allowNull: false
            },
            Location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            BestBefore: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "vaccinations",
            timestamps: true
        }
    );

    return Vaccination;
};
