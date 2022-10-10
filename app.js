const express = require('express');
const app = express();

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


//app.use('/v1', require('./routes