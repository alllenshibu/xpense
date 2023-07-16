const express = require('express');

const { signupController, loginController, findUserByUsernameController } = require('./controllers/auth.controller');
const { authorize } = require('./middlewares/auth.middleware');
const { addNewExpenseController, getAllExpensesController, getExpenseByIdController, editExpenseController } = require('./controllers/expense.controller');
const { getStatsController } = require('./controllers/stats.controller');
const { createNewSplitController } = require('./controllers/split.controller');

const router = express.Router();

// Auth routes
router.post("/auth/signup", async (req, res) => {
    signupController(req, res);
});

router.post("/auth/login", async (req, res) => {
    loginController(req, res);
});

router.get("/user/:username", (req, res) => {
    findUserByUsernameController(req, res);
});

// Expense routes
router.get("/expense", authorize, (req, res) => {
    getAllExpensesController(req, res);
});

router.get("/expense/:id", authorize, (req, res) => {
    getExpenseByIdController(req, res);
});

router.post("/expense", authorize, (req, res) => {
    addNewExpenseController(req, res);
});

router.put("/expense/:id", authorize, (req, res) => {
    editExpenseController(req, res);
});

// Split routes
router.post("/split", authorize, (req, res) => {
    createNewSplitController(req, res);
});

// Category routes
router.get("/category", authorize, (req, res) => {
    res.send("Get all categories");
});

router.get("/category/:id", authorize, (req, res) => {
    res.send("Get category by id");
});

router.post("/category", authorize, (req, res) => {
    res.send("Create category");
});

router.put("/category/:id", authorize, (req, res) => {
    res.send("Update category");
});


// Stats routes
router.get("/stats", authorize, (req, res) => {
    getStatsController(req, res);
});

router.get('/', (req, res) => {
    res.send('Yo');
});

module.exports = router;
