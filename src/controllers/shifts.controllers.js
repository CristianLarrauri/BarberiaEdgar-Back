const { Barbers, Shifts, Customers } = require("../database");
const { Op } = require("sequelize");
const moment = require("moment");
require("moment-timezone");

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
    const futureDates = Array.from({ length: 15 }, (_, i) =>
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
    let shifts = await Shifts.findAll({
      order: [
        ["barber", "ASC"],
        ["date", "ASC"],
        ["time", "ASC"],
      ],
      include: {
        model: Barbers,
        model: Customers,
      },
    });
    return res.status(200).send(shifts);
  } catch (error) {
    console.error("Error in getShifts", error);
  }
};

//_____________________________________________________________
// probablemente no se use

const getShiftsId = async (req, res) => {
  try {
    let shifts = await Shifts.findByPk(req.params.id);
    return res.status(200).send(shifts);
  } catch (error) {
    console.error("Error in getShiftsId", error);
  }
};

//_____________________________________________________________
//Se usa para cambiar turnos en true o false

const editShifts = async (req, res) => {
  try {
    const shift = await Shifts.findOne({ where: { id: req.params.id } });
    const newOccupied = !shift.occupied;
    await shift.update({ occupied: newOccupied });
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in editShifts", error);
  }
};

//_____________________________________________________________
//Se usa para desabilitar los turnos del dia que ya pasaron

const disableShifts = async (req, res) => {
  try {
    const currentDateTime = moment();
    console.log(currentDateTime);
    const shifts = await Shifts.findAll();

    const expiredShifts = shifts.filter((shift) => {
      const shiftDateTime = moment(shift.dateTime);
      return shiftDateTime.isBefore(currentDateTime);
    });
    console.log(expiredShifts);

    if (expiredShifts.length > 0) {
      const shiftIds = expiredShifts.map((shift) => shift.id);
      await Shifts.update(
        { occupied: true },
        {
          where: {
            id: {
              [Op.in]: shiftIds,
            },
          },
        }
      );
    }

    return
  } catch (error) {
    console.error("Error in disableShifts", error);
  }
};

//_____________________________________________________________
//Elimina viejos turnos(dias pasados)

const deleteShifts = async (req, res) => {
  try {
    const currentDate = moment();
    const shifts = await Shifts.findAll();

    const expiredShifts = shifts.filter((shift) => {
      const shiftDate = moment(shift.date);
      return shiftDate.isBefore(currentDate, "day");
    });

    if (expiredShifts.length > 0) {
      await Shifts.destroy({
        where: {
          id: {
            [Op.in]: expiredShifts.map((shift) => shift.id),
          },
        },
      });
    }

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
  disableShifts,
  deleteShifts,
};
