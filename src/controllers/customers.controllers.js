const { Customers, Barbers, Shifts, Barbers_Shifts } = require("../database");

//_____________________________________________________________

const createCustomers = async (req, res) => {
  try {
    console.log(req.body);
    let {
      firstName,
      lastName,
      nickname,
      phoneNumber,
      services,
      user,
      shiftId,
    } = req.body;

    let newCustomer = await Customers.create({
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      nickname: nickname.charAt(0).toUpperCase() + nickname.slice(1),
      phoneNumber,
      services: services.charAt(0).toUpperCase() + services.slice(1),
      user,
    });

    let shiftOfCustomers = await Shifts.findByPk(shiftId);

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
      where: { user: req.query.user },
      include: {
        model: Shifts,
        order: [
          ["date", "ASC"],
          ["time", "ASC"],
        ],
        include: {
          model: Barbers,
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
