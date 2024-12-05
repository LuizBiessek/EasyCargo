module.exports = (sequelize, DataTypes) => {
  const DriverFreight = sequelize.define(
    'DriverFreight',
    {
      freightOfferId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'FreightOffers', // Certifique-se de que a tabela de ofertas de frete se chama 'FreightOffers'
          key: 'id',
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'DriverFreights',
      timestamps: true, // Ajuste conforme necessário
    }
  );

  DriverFreight.associate = (models) => {
    DriverFreight.belongsTo(models.FreightOffer, { foreignKey: 'freightOfferId' });
  };

  return DriverFreight;
};
