const pool = require("../utils/pg");

const authorize = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // if (!authHeader || authHeader === '' || authHeader === undefined) {
    //     return res.status(401).send('Unauthorized');
    // }
    // const token = authHeader.split(' ')[1];
    // if (!token || token === '' || token === undefined) {
    //     return res.status(401).send('Unauthorized');
    // }

    // const user = await pool.query('SELECT * FROM "user" WHERE id = $1', [token]);

    // if (user?.rows?.length === 0) {
    //     return res.status(401).send('Unauthorized');
    // }

    req.user = user?.rows[0]?.email;
    next();
}

module.exports = {
    authorize
}