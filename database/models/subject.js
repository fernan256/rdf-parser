'use strict';

module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('subject', {
    ebookId: DataTypes.INTEGER,
    subject: DataTypes.STRING,
  }, {
    indexes:[
      {
        name: 'subject',
        unique: false,
        fields: ['subject']
      }
    ]
  });

  Subject.associate = function (models) {
    Subject.belongsTo(models.ebook, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Subject;
};