// Requirements
const router = require("express").Router();
const userRoutes = require("./userRoutes");

// Mount user routes under /users
router.use("/users", userRoutes);

module.exports = router;