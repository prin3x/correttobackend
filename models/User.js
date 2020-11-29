module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(255),
      },
      default_shipping_address: {
        type: DataTypes.STRING(255),
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isVendor: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'users',
    }
  );

  model.associate = models => {
    model.hasMany(models.Order, {foreignKey: 'order_id', onDelete: 'cascade'});
    model.hasOne(models.AddToCart, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
    });
    model.hasMany(models.Review, {foreignKey: 'user_id', onDelete: 'cascade'});
  };
  return model;
};
