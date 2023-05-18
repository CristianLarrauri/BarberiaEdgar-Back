const { Barbers, Shifts, Customers } = require("../database");
const moment = require("moment");
const { Sequelize } = require("sequelize");

const createShifts = async (req, res) => {
  try {
    const barbers = await Barbers.findAll();

    for (const barber of barbers) {
      // Obtener la fecha actual
      const today = moment().startOf("day");

      // Crear turnos para los próximos 14 días, excepto dia Domingo
      for (let i = 0; i < 14; i++) {
        const date = today.clone().add(i, "days");
        let dayShift = "";
        if (date.day() === 0) continue;
        if (date.day() === 1) dayShift = "Lunes";
        if (date.day() === 2) dayShift = "Martes";
        if (date.day() === 3) dayShift = "Miercoles";
        if (date.day() === 4) dayShift = "Jueves";
        if (date.day() === 5) dayShift = "Viernes";
        if (date.day() === 6) dayShift = "Sabado";

        // Generar turnos cada 45 min desde las 9:00 hasta las 21:00
        let turno = moment({ hour: 9 });
        for (let j = 0; j <= 16; j++) {
          const time = turno.format("HH:mm");
          const dateTime = moment(date)
            .hour(turno.hour())
            .minute(turno.minute());

          // Buscar o crear el turno en la base de datos
          const [shift, created] = await Shifts.findOrCreate({
            where: { dateTime, date, time, day: dayShift, barber: barber.name },
          });

          // Si creo asociar los barberos al turno
          if (created) {
            await shift.addBarbers(barber);
          }

          turno.add(45, "minutes");
        }
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
