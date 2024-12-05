module.exports = (sequelize, DataTypes) => {
  const LoadingLocation = sequelize.define(
    'LoadingLocation',
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'LoadingLocations',
      timestamps: true, // Inclui `createdAt` e `updatedAt`
    }
  );

  LoadingLocation.associate = (models) => {
    LoadingLocation.belongsTo(models.Company, { foreignKey: 'companyId' });
  };

  return LoadingLocation;
};
