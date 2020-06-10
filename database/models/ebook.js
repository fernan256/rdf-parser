'use strict';

module.exports = (sequelize, DataTypes) => {
  const Ebook = sequelize.define("ebook", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING(1024),
    publisher: DataTypes.STRING,
    publication_date: DataTypes.STRING,
    language: DataTypes.STRING,
    license: DataTypes.STRING,
    rights: DataTypes.STRING
  }, {
    indexes:[
      {
        name: 'id',
        unique: true,
        fields: ['id']
      },
      {
        name: 'title',
        unique: false,
        fields: ['title']
      }
    ]
  });

  Ebook.associate = function(models) {
    Ebook.hasMany(models.subject, {
      onDelete: "CASCADE"
    });

    Ebook.hasMany(models.author, {
      onDelete: "CASCADE"
    });
  };
      
  return Ebook;
};