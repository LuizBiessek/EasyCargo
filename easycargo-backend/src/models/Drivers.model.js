module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define(
    'Driver',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users', // Certifique-se de que a tabela de usuários se chama 'Users'
          key: 'id',
        },
      },
      licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      averageRating: {
        type: DataTypes.SMALLINT,
        allowNull: true, // Altere para `false` se não for opcional
      },
    },
    {
      tableName: 'Drivers',
      timestamps: true, // Inclui `createdAt` e `updatedAt`
    }
  );

  Driver.associate = (models) => {
    Driver.belongsTo(models.User, { foreignKey: 'id' });
  };

  return Driver;
};
