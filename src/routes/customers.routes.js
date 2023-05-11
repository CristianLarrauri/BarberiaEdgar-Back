const { Router } = require("express");
const {
  createCustomers,
  getCustomers,
  editCustomers,
  deleteCustomers,
  getCustomersId,
} = require("../controllers/customers.controllers");

const router = Router();

router.post("/", createCustomers);
router.get("/", getCustomers);
router.get("/:id", getCustomersId);
router.put("/:id", editCustomers);
router.delete("/:id", deleteCustomers);

module.exports = router;
