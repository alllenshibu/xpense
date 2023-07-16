const { signupService, loginService, findUserByUsernameService } = require('../services/auth.service');

const signupController = async (req, res) => {
    const username = req?.body?.username;
    const password = req?.body?.password;

    if (!username || username === '' || username === undefined) {
        return res.status(400).send('Username is required');
    }
    if (!password || password === '' || password === undefined) {
        return res.status(400).send('Password is required');
    }
    try {
        token = await signupService(req.body.username, req.body.password);
        if (token) {
            const message = {
                token: token
            }
            res.status(200).send(message);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const loginController = async (req, res) => {
    const username = req?.body?.username;
    const password = req?.body?.password;

    if (!username || username === '' || username === undefined) {
        return res.status(400).send('Username is required');
    }
    if (!password || password === '' || password === undefined) {
        return res.status(400).send('Password is required');
    }

    try {
        token = await loginService(req.body.username, req.body.password);
        if (token) {
            const message = {
                token: token
            }
            res.status(200).send(message);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const findUserByUsernameController = async (req, res) => {
    const username = req?.params?.username;

    if (!username || username === '' || username === undefined) {
        return res.status(400).send('Username is required');
    }

    try {
        const userId = await findUserByUsernameService(username);
        if (userId) {
            const message = {
                userId: userId
            }
            res.status(200).send(message);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}


module.exports = {
    signupController,
    loginController,
    findUserByUsernameController
}