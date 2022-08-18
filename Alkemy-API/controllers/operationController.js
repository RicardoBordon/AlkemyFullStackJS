const db = require("../db");
const cookie = require('cookie');

const createOperation = async (req, res) => {
    
    try {
        const { concepto, monto, fecha, tipo, id_users } = req.body;
        const result = await db.query(
            'INSERT INTO operations (concepto, monto, fecha, tipo, id_users) VALUES ($1, $2, $3, $4, $5)',
            [concepto, monto, fecha, tipo, id_users]
            );
        return res.json(result.command);
    } catch (error) {
        return res.json("error"+ error);
    }
}

const readAllOperation = async (req, res) => {
    const {id_users} = req.body;
    let total = parseFloat(0);
    try {
        const result = await db.query(
            'SELECT * FROM operations WHERE id_users = ($1)', [id_users]
            );
            result.rows.forEach(function(e){
                if(e.tipo === "INCOME"){
                    total += parseFloat(e.monto);
                }
                 else if(e.tipo === "OUTFLOW"){
                    total -= parseFloat(e.monto);
                }
            })
            return res.status(200).json([result.rows, {"balance": total.toFixed(2)}])  
    } catch (error) {
        return res.json("error"+ error);
    }
}

const readOperation = async (req, res) => {
    const id_users= req.params.user;
    const id_operation = req.params.id;

    try {
        const result = await db.query(
            'SELECT * FROM operations WHERE id_users = ($1) AND id_operation = ($2)', [id_users, id_operation]
            );
        return res.json(result.rows[0]);
    } catch (error) {
        return res.json("error"+ error);
    }
}

const updateOperation = async (req, res) => {
    const id_users= req.params.user;
    const id_operation = req.params.id;
    try {
         let { concepto, monto, fecha } = req.body;

        const read = await db.query(
            'SELECT * FROM operations WHERE id_users = ($1) AND id_operation = ($2)', [id_users, id_operation]
            );

            if(concepto === "undefined") concepto = read.rows[0].concepto;
            if(monto == "undefined") monto = read.rows[0].monto;
            if(fecha == "Invalid Date") fecha = read.rows[0].fecha;   
        const result = await db.query(
            'UPDATE operations SET concepto = $1, monto = $2, fecha = $3 WHERE id_users = $4 AND id_operation = $5',
            [concepto, monto, fecha, id_users, id_operation]
            );
        return res.status(200).json(result.command);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const deleteOperation = async (req, res) => {
        const { id_users, id_operation} = req.body;
    try {
        const result = await db.query(
            'DELETE FROM operations WHERE id_users = $1 AND id_operation = $2', [id_users, id_operation]);
            return res.json(result.command);
    } catch (error) {
        return res.json("error"+ error);
    }
}

const balance = async (req, res) => {
    try {
        const {id_users} = req.body;
        let total = parseFloat(0);
        const read = await db.query(
            'SELECT * FROM operations WHERE id_users = ($1) ORDER BY id_operation DESC LIMIT 10' , [id_users]
            );

        read.rows.forEach(function(e){
            if(e.tipo === "INCOME"){
                total += parseFloat(e.monto);
            }
             else if(e.tipo === "OUTFLOW"){
                total -= parseFloat(e.monto);
            }
        })
        return res.status(200).json([read.rows, {"balance": total.toFixed(2)}])        
                
    } catch (error) {
        return res.json("error"+ error);
    }
}



module.exports = { createOperation, readAllOperation, readOperation, updateOperation, deleteOperation, balance }