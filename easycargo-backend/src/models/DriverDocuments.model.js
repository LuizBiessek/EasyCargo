module.exports = (sequelize, DataTypes) => {
  const DriverDocument = sequelize.define(
    'DriverDocument',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Certifique-se de que a tabela de usuários se chama 'Users'
          key: 'id',
        },
      },
      documentTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'DocumentTypes', // Certifique-se de que a tabela de tipos de documentos se chama 'DocumentTypes'
          key: 'id',
        },
      },
      documentImage: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'DriverDocuments',
      timestamps: true, // Ajuste conforme necessário
    }
  );

  DriverDocument.associate = (models) => {
    DriverDocument.belongsTo(models.User, { foreignKey: 'userId' });
    DriverDocument.belongsTo(models.DocumentType, { foreignKey: 'documentTypeId' });
  };

  return DriverDocument;
};
