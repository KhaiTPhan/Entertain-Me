module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [1],
        max: 5,
        min: 1,
      },
    },
      author: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
      },  
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: 'Streaming',
    }
  });

  return Review;
};
