const { Router } = require("express");
const router = Router();
const getMockingProducts = require("../controllers/mocking/mockingProducts");

router.get("/", getMockingProducts);

module.exports = router;