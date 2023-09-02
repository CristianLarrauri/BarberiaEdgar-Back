const { Barbers, Shifts, Customers } = require("../database");
const { createShifts, deleteShifts } = require("./shifts.controllers");

//_____________________________________________________________

const createBarbers = async (req, res) => {
  try {
    let { name } = req.body;

    await Barbers.create({
      where: { name: name.charAt(0).toUpperCase() + name.slice(1) },
    });

    await createShifts();

    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in createBarbers", error);
  }
};

//_____________________________________________________________

const getBarbers = async (req, res) => {
  try {
    await createShifts();
    await deleteShifts();

    let barbers = await Barbers.findAll({
      include: {
        model: Shifts,
      },
    });
    return res.status(200).send(barbers);
  } catch (error) {
    console.error("Error in getBarbers", error);
  }
};

//_____________________________________________________________

const getBarbersId = async (req, res) => {
  try {
    let barbers = await Barbers.findByPk(req.params.id, {
      include: {
        model: Shifts,
        order: [
          ["date", "ASC"],
          ["time", "ASC"],
        ],
        where: {
          date: req.query.date,
        },
        include: {
          model: Customers,
        },
      },
      order: [
        [Shifts, "date", "ASC"],
        [Shifts, "time", "ASC"],
      ],
    });
    return res.status(200).send(barbers);
  } catch (error) {
    console.error("Error in getBarbersId", error);
  }
};

//_____________________________________________________________
//usar para editar un barbero? O solo usaremos agregar o eliminar?

const editBarbers = async (req, res) => {
  try {
    await Barbers.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    );
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in editBarbers", error);
  }
};

//_____________________________________________________________
// Elimina un barbero

const deleteBarbers = async (req, res) => {
  try {
    await Barbers.destroy({ where: { name: req.params.id } });
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in deleteBarbers", error);
  }
};

module.exports = {
  createBarbers,
  getBarbers,
  getBarbersId,
  editBarbers,
  deleteBarbers,
};
