module.exports = (sequelize, DataTypes) => {
    return sequelize.define("clients", {
        ClientID: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        FullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EmailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        PasswordHASH: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhoneNumber2FA: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
};
