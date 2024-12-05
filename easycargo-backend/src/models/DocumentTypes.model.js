module.exports = (sequelize, DataTypes) => {
  const DocumentType = sequelize.define(
    'DocumentType',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'DocumentTypes',
      timestamps: true, // Ajuste conforme necessário
    }
  );

  return DocumentType;
};
