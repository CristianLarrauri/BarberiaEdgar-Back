const { Op } = require("sequelize");
const { Customers, Barbers, Shifts, Barbers_Shifts } = require("../database");

//_____________________________________________________________

const createCustomers = async (req, res) => {
  try {
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
      services,
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
    const { user, searchbar } = req.query;
    let customers;
    const whereClause = {};

    if (user) {
      whereClause.user = user;
    }
    if (searchbar) {
      whereClause[Op.or] = {
        firstName: { [Op.iLike]: `%${searchbar}%` },
        lastName: { [Op.iLike]: `%${searchbar}%` },
        nickname: { [Op.iLike]: `%${searchbar}%` },
      };
    }

    customers = await Customers.findAll({
      where: whereClause,
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
    return res.status(500).send("Error retrieving customers");
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
// usar para editar un turno? O solo crear y eliminar?

const editCustomers = async (req, res) => {
  try {
    await Customers.update(req.body, { where: { id: req.params.id } });
    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in editCustomers", error);
  }
};

//_____________________________________________________________
// usar para eliminar un turno?

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
