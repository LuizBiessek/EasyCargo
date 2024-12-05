module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    'Vehicle',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Certifique-se de que o nome da tabela está correto
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      modelDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registrationAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Vehicles',
      timestamps: true, // Inclui `createdAt` e `updatedAt`
    }
  );

  Vehicle.associate = (models) => {
    Vehicle.belongsTo(models.User, { foreignKey: 'ownerId' });
  };

  return Vehicle;
};
