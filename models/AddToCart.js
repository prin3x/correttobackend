module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'AddToCart',
    {
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'add_to_cart',
      timestamps: false,
    }
  );

  model.associate = models => {
    model.belongsTo(models.User, {foreignKey: 'user_id'});
    model.belongsTo(models.Product, {foreignKey: 'product_id'});
  };

  return model;
};
