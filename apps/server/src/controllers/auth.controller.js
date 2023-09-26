const { signupService, loginService, findUserByemailService } = require('../services/auth.service');

const signupController = async (req, res) => {
    const email = req?.body?.email;
    const password = req?.body?.password;
    const firstName = req?.body?.firstName;
    const lastName = req?.body?.lastName;

    if (!email || email === '' || email === undefined) {
        return res.status(400).send('Email is required');
    }
    if (!password || password === '' || password === undefined) {
        return res.status(400).send('Password is required');
    }
    if (!firstName || firstName === '' || firstName === undefined) {
        return res.status(400).send('First name is required');
    }
    if (!lastName || lastName === '' || lastName === undefined) {
        return res.status(400).send('Last name is required');
    }

    try {
        token = await signupService(
            email,
            password,
            firstName,
            lastName
        );

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
    const email = req?.body?.email;
    const password = req?.body?.password;

    if (!email || email === '' || email === undefined) {
        return res.status(400).send('Email is required');
    }
    if (!password || password === '' || password === undefined) {
        return res.status(400).send('Password is required');
    }

    try {
        token = await loginService(
            email,
            password
        );

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

const findUserByEmailController = async (req, res) => {
    const email = req?.params?.email;

    if (!email || email === '' || email === undefined) {
        return res.status(400).send('Email is required');
    }

    try {
        const userId = await findUserByemailService(email);
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
    findUserByEmailController
}