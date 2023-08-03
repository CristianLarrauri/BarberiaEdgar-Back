const { Router } = require("express");
const {
  createShifts,
  getShifts,
  editShifts,
  deleteShifts,
  getShiftsId,
  disableShifts,
} = require("../controllers/shifts.controllers");

const router = Router();

router.post("/", createShifts);
router.get("/", getShifts);
router.get("/:id", getShiftsId);
router.put("/", disableShifts);
router.put("/:id", editShifts);
router.delete("/:id", deleteShifts);

module.exports = router;
