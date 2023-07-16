const pool = require('../utils/pg');


const signupService = async (username, password) => {
    let user = await pool.query('SELECT * FROM "user" WHERE username = $1', [username]);
    if (user?.rows?.length > 0) {
        throw new Error('User already exists');
    }

    console.log('Creating user');
    const result = await pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING *', [username, password]);

    if (result?.rows?.length > 0) {
        return result?.rows[0]?.id;
    } else {
        throw new Error('Something went wrong');
    }

}

const loginService = async (username, password) => {
    let user = await pool.query('SELECT * FROM "user" WHERE username = $1', [username]);
    if (user?.rows?.length === 0) {
        throw new Error('User does not exist');
    }

    if (user?.rows?.length > 0 && user.rows[0].password !== password) {
        throw new Error('Wrong password');
    }

    return user?.rows[0]?.id;
}

const findUserByUsernameService = async (username) => {
    let user = await pool.query('SELECT * FROM "user" WHERE username = $1', [username]);
    if (user?.rows?.length === 0) {
        throw new Error('User does not exist');
    }
    return user?.rows[0]?.id;
}


module.exports = {
    signupService,
    loginService,
    findUserByUsernameService
}