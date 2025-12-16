module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      ClientId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "clients",
      timestamps: true,
    }
  );

  return Client;
};
