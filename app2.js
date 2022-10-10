const { Sequelize, DataTypes, Op } = require('sequelize');
const express = require('express');
require('dotenv').config();
require('./config/passport');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = require('./config/db');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`Enviroment: ${process.env.NODE_ENV}`);
});
app.get('/',(req,res)=>{
    res.send('Aplicación BEDUSHOP');
});
const bedushop = {
    productos:{farmacia:'Shampoo', verduras:'Manzana'},
    empleados:{gerente:'Juan Ramirez',cajero:'Luis Martínez'}
}
app.get('/bedushop',(req,res)=>{
    res.json(bedushop);
});
app.get('/bedushop:name',(req,res)=>{
    const name =req.params.name;
    res.json(bedushop[name]);
});

try {
    sequelize.authenticate();
    sequelize.sync();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//app.use('/v1', require('./routes'));