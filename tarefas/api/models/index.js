import Sequelize from "sequelize";
import pg from "pg";
import getTarefaModel from "./tarefa.js";
import "dotenv/config";



const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, 
    idle: 10000    
  },
  logging: false,
});

const models = {
  tarefa: getTarefaModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;