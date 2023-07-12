const { Router } = require("express");

const {
  createServices,
  getServices,
  updatServices,
  deletServices,
} = require("../controllers/services.controllers");

const router = Router();

router.post("/", createServices);
router.get("/", getServices);
router.put("/:id", updatServices);
router.delete("/:id", deletServices);

module.exports = router;
