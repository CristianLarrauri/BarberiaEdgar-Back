const { Barbers, Shifts, Customers } = require("../database");
const moment = require("moment");
const { Sequelize } = require("sequelize");

const createShifts = async (req, res) => {
  try {
    const barbers = await Barbers.findAll();
    const daysOfWeek = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];

    const today = moment().startOf("day");
    const futureDates = Array.from({ length: 14 }, (_, i) =>
      today.clone().add(i, "days")
    );

    for (const barber of barbers) {
      for (const date of futureDates) {
        if (date.day() === 0) continue;

        const dayShift = daysOfWeek[date.day() - 1];
        const startTime = moment({ hour: 9 });

        for (let i = 0; i <= 16; i++) {
          const time = startTime.format("HH:mm");
          const dateTime = moment(date)
            .hour(startTime.hour())
            .minute(startTime.minute());

          const [shift, created] = await Shifts.findOrCreate({
            where: { dateTime, date, time, day: dayShift, barber: barber.name },
          });

          if (created) {
            await shift.addBarbers(barber);
          }

          startTime.add(45, "minutes");
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
