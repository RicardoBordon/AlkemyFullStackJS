const db = require("../db");
const bcryptjs = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const { email, pass, rePass } = req.body;
        if(pass === rePass){ 
        const salt = await bcryptjs.genSalt(10);
        const hashPass = await bcryptjs.hash(pass, salt);    

        const result = await db.query('INSERT INTO users (email, pass) VALUES ($1, $2)',[email, hashPass]);
        return res.status(200).json(result.command);
    }
    else throw new Error("passwords don't match")
    } catch (error) {
        return res.status(400).json(""+ error);
    }

}

const login = async(req,res) => {
    try {
        const { email, pass } = req.body;
        const result = await db.query('SELECT * FROM users WHERE email = ($1)',[email]);
        const comparePass = await bcryptjs.compare(pass, result.rows[0].pass);

        if(email === result.rows[0].email && comparePass){
            return res.status(200).json(result.rows[0]);
        }
        else throw new Error("credenciales incorrectas")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        
    } catch (error) {
        return res.status(400).json({"error": "credenciales incorrectas"});
    }
}

module.exports = { createUser, login }

