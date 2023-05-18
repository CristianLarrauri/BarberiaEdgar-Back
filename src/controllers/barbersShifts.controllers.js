const {
  Barbers,
  Barbers_Shifts,
  Shifts,
  Customers,
  Barbers_Shifts_Customers,
} = require("../database");

const createBarbersShifts = () => {};
const getBarbersShifts = async (req, res) => {
  try {
    let barbersShifts = await Barbers_Shifts.findAll({
      order: [["id", "ASC"]],
      include: {
        model: Customers,
      },
    });
    return res.status(200).send(barbersShifts);
  } catch (error) {
    console.error("Error in getBarbers", error);
  }
};
const getBarbersShiftsId = () => {};
const editBarbersShifts = () => {};
const deleteBarbersShifts = () => {};

module.exports = {
  createBarbersShifts,
  getBarbersShifts,
  getBarbersShiftsId,
  editBarbersShifts,
  deleteBarbersShifts,
};
