const { Barbers, Shifts, Customers } = require("../database");
const moment = require("moment");
const { Sequelize } = require("sequelize");

const createShifts = async (req, res) => {
  try {
    // Obtener la fecha actual
    const today = moment().startOf("day");

    // Obtener todos los barberos de la base de datos
    const barbers = await Barbers.findAll();

    // Crear turnos para los próximos 14 días
    for (let i = 0; i < 14; i++) {
      const date = today.clone().add(i, "days");

      // Generar turnos cada hora desde las 10:00 hasta las 20:00
      let turno = moment({ hour: 9 });
      for (let j = 0; j <= 17; j++) {
        const time = turno.format("HH:mm");

        // Establecer el valor de "occupied" en verdadero si es domingo
        const occupied = date.day() === 0;

        // Crear el turno en la base de datos
        const shift = await Shifts.create({ date, time, occupied });
        await shift.addBarbers(barbers);

        turno.add(45, "minutes");
      }
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in createShifts", error);
  }
};

//_____________________________________________________________

const getShifts = async (req, res) => {
  try {
    let shifts = await Shifts.findAll();
    return res.status(200).send(shifts);
  } catch (error) {
    console.error("Error in getShifts", error);
  }
};

//_____________________________________________________________

const getShiftsId = async (req, res) => {
  try {
    let shifts = await Shifts.findByPk(req.params.id);
    return res.status(200).send(shifts);
  } catch (error) {
    console.error("Error in getShiftsId", error);
  }
};

//_____________________________________________________________

const editShifts = async (req, res) => {
  try {
    await Shifts.update(
      { occupied: Sequelize.literal("NOT occupied") },
      {
        where: { id: req.params.id },
      }
    );
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in editShifts", error);
  }
};

//_____________________________________________________________

const deleteShifts = async (req, res) => {
  try {
    await Shifts.destroy({ where: { id: req.params.id } });
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in deleteShifts", error);
  }
};

module.exports = {
  createShifts,
  getShifts,
  getShiftsId,
  editShifts,
  deleteShifts,
};
