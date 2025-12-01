module.exports = (sequelize, DataTypes) => {
    const Vaccine = sequelize.define('Vaccine', {
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
        }
    });

    return Vaccine;
};
