module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Order',
    {
      order_status: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'orders',
    }
  );

  model.associate = models => {
    model.hasMany(models.Order_detail, {
      foreignKey: 'order_id',
      onDelete: 'cascade',
    });
    model.belongsTo(models.User, {foreignKey: 'user_id'});
  };
  return model;
};
