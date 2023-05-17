const { Customers, Barbers, Shifts } = require("../database");

//_____________________________________________________________

const createCustomers = async (req, res) => {
  try {
    let { name, surname, nickname, phone, barber, shift } = req.body;

    let newCustomer = await Customers.create({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      surname: surname.charAt(0).toUpperCase() + surname.slice(1),
      nickname: nickname.charAt(0).toUpperCase() + nickname.slice(1),
      phone,
    });

    let barberOfCustomers = await Barbers.findByPk(barber);
    let shiftOfCustomers = await Shifts.findByPk(shift);

    await newCustomer.addBarbers(barberOfCustomers);
    await newCustomer.addShifts(shiftOfCustomers);

    return res.status(200).send(newCustomer);
  } catch (error) {
    console.error("Error in createCustomers", error);
  }
};

//_____________________________________________________________

const getCustomers = async (req, res) => {
  try {
    let customers = await Customers.findAll({
      include: {
        model: Shifts,
        through: {
          attributes: [],
        },
        include: {
          model: Barbers,
          through: {
            attributes: [],
          },
        },
      },
    });
    return res.status(200).send(customers);
  } catch (error) {
    console.error("Error in getCustomers", error);
  }
};

//_____________________________________________________________

const getCustomersId = async (req, res) => {
  try {
    let customers = await Customers.findByPk(req.params.id);
    return res.status(200).send(customers);
  } catch (error) {
    console.error("Error in getCustomersId", error);
  }
};

//_____________________________________________________________

const editCustomers = async (req, res) => {
  try {
    await Customers.update(req.body, { where: { id: req.params.id } });
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in editCustomers", error);
  }
};

//_____________________________________________________________

const deleteCustomers = async (req, res) => {
  try {
    await Customers.destroy({ where: { id: req.params.id } });
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in deleteCustomers", error);
  }
};

module.exports = {
  createCustomers,
  getCustomers,
  getCustomersId,
  editCustomers,
  deleteCustomers,
};