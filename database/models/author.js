'use strict';

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
    ebookId:DataTypes.INTEGER,
    author: DataTypes.STRING
  }, {
    indexes:[
      {
        name: 'author',
        unique: false,
        fields: ['author']
      }
    ]
  });

  Author.associate = function (models) {
    Author.belongsTo(models.ebook, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Author;
};