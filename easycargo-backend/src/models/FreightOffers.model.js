module.exports = (sequelize, DataTypes) => {
  const FreightOffer = sequelize.define(
    'FreightOffer',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Companies', // Certifique-se de que o nome da tabela está correto
          key: 'id',
        },
      },
      loadingLocationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'LoadingLocations', // Certifique-se de que o nome da tabela está correto
          key: 'id',
        },
      },
      cargoType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cargoWeight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      requiresSpecialDocuments: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      vehicleAvailability: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      freightValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      departureDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'FreightOffers',
      timestamps: true, // Inclui `createdAt` e `updatedAt`
    }
  );

  FreightOffer.associate = (models) => {
    FreightOffer.belongsTo(models.Company, { foreignKey: 'companyId' });
    FreightOffer.belongsTo(models.LoadingLocation, { foreignKey: 'loadingLocationId' });
  };

  return FreightOffer;
};
