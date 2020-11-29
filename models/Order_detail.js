module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Order_detail',
    {
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'order_details',
    }
  );

  model.associate = models => {
    model.belongsTo(models.Product, {foreignKey: 'product_id'});
    model.belongsTo(models.Order, {foreignKey: 'order_id'});
  };

  return model;
};
