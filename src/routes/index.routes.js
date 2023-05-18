const { Router } = require("express");

const customers = require("./customers.routes");
const barbers = require("./barbers.routes");
const shifts = require("./shifts.routes");
const barbersShifts = require("./barbersShifts.routes");

const router = Router();

router.use("/customers", customers);
router.use("/barbers", barbers);
router.use("/shifts", shifts);
router.use("/barbersShifts", barbersShifts);

module.exports = router;
