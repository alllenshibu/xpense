const pool = require('../utils/pg');

const getAllCategoriesService = async (user) => {
    try {
        console.log('Getting all categories');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('SELECT * FROM category WHERE user_id = $1', [userId?.rows[0]?.id]);

        // Doesn't work if there are no categories
        // if (result?.rows?.length > 0) {
        //     return result?.rows;
        // } else {
        //     throw new Error('Something went wrong');
        // }
        return result?.rows;
    } catch (err) {
        throw new Error(err.message);
    }
}


const getCategoryByIdService = async (user, categoryId) => {
    try {
        console.log('Getting categories by id');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('SELECT * FROM category WHERE user_id = $1 AND id = $2', [userId?.rows[0]?.id, categoryId]);
        if (result?.rows?.length > 0) {
            return result?.rows[0];
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        throw new Error(err.message);
    }
}


const addNewCategoryService = async (user, name) => {
    try {
        console.log('Adding new category');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('INSERT INTO category (name,  user_id) VALUES ($1, $2) RETURNING id', [name, userId?.rows[0]?.id]);
        if (result?.rows?.length > 0) {
            return result?.rows[0]?.id;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {

        throw new Error(err.message);
    }
}

module.exports = {
    getAllCategoriesService,
    getCategoryByIdService,
    addNewCategoryService
}