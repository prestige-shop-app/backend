const { Model, Sequelize } = require('sequelize');
const sequelize = require('../database/index.js')
class Collection extends Model {}
Collection.init({
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  address : Sequelize.STRING,
  phoneNumber: Sequelize.INTEGER,
  imgUrl:Sequelize.STRING
}, { sequelize, modelName: 'Collection' });

module.exports = Collection;

