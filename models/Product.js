module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'Product',
    {
      sku: {
        type: DataTypes.STRING(255),
      },
      name: {
        type: DataTypes.STRING(255),
      },
      image: {
        type: DataTypes.STRING(255),
      },
      description: {
        type: DataTypes.STRING(255),
      },
      brand: {
        type: DataTypes.STRING(255),
      },
      category: {
        type: DataTypes.STRING(255),
      },
      price: {
        type: DataTypes.INTEGER,
      },
      countInStock: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'products',
      timestamps: false,
    }
  );

  model.associate = models => {
    model.hasMany(models.Order_detail, {
      foreignKey: 'product_id',
      onDelete: 'cascade',
    });
    model.hasMany(models.AddToCart, {
      foreignKey: 'product_id',
      onDelete: 'cascade',
    });
    model.hasMany(models.Review, {
      foreignKey: 'product_id',
      onDelete: 'cascade',
    });
  };

  return model;
};
