const express = require("express");

const router = express.Router();

const runRoutes = require("./runRoutes");

router.use("/run", runRoutes);

module.exports = router;