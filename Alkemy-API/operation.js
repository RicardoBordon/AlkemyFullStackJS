

export const create_operation = async(req, res) => {
    const {concepto, monto, fecha, tipo} = req.body;
    try {
        return res.status(201).json({ok: "guardado en db", token, expiresIn});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Servidor no econtrado"});
    }
};

export const edit_operation = async(req, res) => {
    const {concepto, monto, fecha, tipo} = req.body;
    try {
        return res.status(201).json({ok: "guardado en db", token, expiresIn});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Servidor no econtrado"});
    }
};
