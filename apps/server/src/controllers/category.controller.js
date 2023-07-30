const { getAllCategoriesService, getCategoryByIdService, addNewCategoryService } = require('../services/category.service');


const getAllCategoriesController = async (req, res) => {
    const user = req?.user;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    try {
        result = await getAllCategoriesService(user);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getCategoryByIdController = async (req, res) => {
    const user = req?.user;
    const categoryId = req?.params?.id;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }


    if (!categoryId || categoryId === '' || categoryId === undefined) {
        return res.status(400).send('Category Id is required');
    }

    try {
        result = await getCategoryByIdService(user, categoryId);
        if (result) {
            console.log(result);
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const addNewCategoryController = async (req, res) => {
    const user = req?.user;
    const name = req?.body?.name;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    if (!name || name === '' || name === undefined) {
        return res.status(400).send('Category name is required');
    }

    try {
        result = await addNewCategoryService(user, name);

        if (result) {

            res.status(200).send(result);
        }
    } catch (err) {

        res.status(400).send(err.message);
    }
}
module.exports = {
    getAllCategoriesController,
    getCategoryByIdController,
    addNewCategoryController
}
