const { Router } = require("express");
const {
  createBarbersShifts,
  getBarbersShifts,
  editBarbersShifts,
  deleteBarbersShifts,
  getBarbersShiftsId,
} = require("../controllers/barbersShifts.controllers");

const router = Router();

router.post("/", createBarbersShifts);
router.get("/", getBarbersShifts);
router.get("/:id", getBarbersShiftsId);
router.put("/:id", editBarbersShifts);
router.delete("/:id", deleteBarbersShifts);

module.exports = router;
