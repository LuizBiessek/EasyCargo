module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Companies',
      timestamps: true, // Ajuste conforme necessário
    }
  );

  Company.associate = (models) => {
    Company.belongsTo(models.User, { foreignKey: 'id' });
  };

  return Company;
};
