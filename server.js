//console.log("Hola mundo desde nodejs");

const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const TareaSchema = require('./modelos/tarea.js');

const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexion a base de datos

mongoose.connect("mongodb+srv://progadmin:progadmin2022@cluster0.x4zrkxq.mongodb.net/ActividadesBD?retryWrites=true&w=majority");

// Operaciones CRUD
router.get('/',(req, res) => {
    res.send('El inicio de mi API');
});

router.get('/tarea',(req, res) => {
    TareaSchema.find(function(err,data) {
        if (err){
            console.log("Error leyendo tareas");
        }else{
            res.send(data);
        } 
    });
});
        
router.post('/tarea',(req, res) => {
    let nuevaTarea = new TareaSchema({
        idTarea: req.body.id,
        nombreTarea: req.body.nombre,
        detalleTarea: req.body.detalle

    });
    nuevaTarea.save(function (err, data) {
        if (err) {
            console.log(err);
        } else{
            res.send("Tarea guardada con exito");
        }
    });
});

router.put('/tarea',(req, res) => {
    TareaSchema.updateOne({idTarea:req.body.id},{
        nombreTarea:req.body.nombre,
        detalleTarea:req.body.detalle
    },function(err,data){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Tarea actualizada exitosamente");
        }
    });
});

router.delete('/tarea',(req, res) => {
    TareaSchema.deleteOne({idTarea:req.body.id},function(err, data) {
        if (err) {
            res.send(err);
        }else {
            res.send("Tarea eliminada exitosamente");
        }
    });
});

app.use(router);
app.listen(3000,()=>{
    console.log("Server running on port 3000");
});