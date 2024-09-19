
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Post = require('./post');


const Categories = sequelize.define('Categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
   
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
}, {
    tableName: 'Categories',
    timestamps: false,
});


Post.belongsTo(Categories,{as:'category', foreignKey: 'categoryId'})


module.exports = Categories;
