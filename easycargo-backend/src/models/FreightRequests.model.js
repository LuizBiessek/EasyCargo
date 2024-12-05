module.exports = (sequelize, DataTypes) => {
  const FreightRequest = sequelize.define(
    'FreightRequest',
    {
      freightOfferId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'FreightOffers', // Certifique-se de que o nome da tabela está correto
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      driverId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Drivers', // Certifique-se de que o nome da tabela está correto
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      requestDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'FreightRequests',
      timestamps: true, // Inclui `createdAt` e `updatedAt`
    }
  );

  FreightRequest.associate = (models) => {
    FreightRequest.belongsTo(models.FreightOffer, { foreignKey: 'freightOfferId' });
    FreightRequest.belongsTo(models.Driver, { foreignKey: 'driverId' });
  };

  return FreightRequest;
};
