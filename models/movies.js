module.exports = (sequelize, DataTypes) => {
    const Movies = sequelize.define('Movies', {
    
        rank_no: DataTypes.INTEGER,
        title: DataTypes.STRING,
        genre: DataTypes.STRING,
        description: DataTypes.STRING,
        director: DataTypes.STRING,
        actors: DataTypes.STRING,
        year: DataTypes.INTEGER,
        runtime: DataTypes.INTEGER,
        rating: DataTypes.DECIMAL,
        votes: DataTypes.INTEGER,
        revenue: DataTypes.INTEGER,
        metascore: DataTypes.DECIMAL,  
    }, {

        timestamps: false
    
    });
      return Movies;
  };
  