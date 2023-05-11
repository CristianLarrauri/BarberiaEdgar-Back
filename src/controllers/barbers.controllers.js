const { Barbers } = require("../database");

//_____________________________________________________________

const createBarbers = async (req, res) => {
  try {
    let { name } = req.body;

    await Barbers.findOrCreate({
      where: { name: name.charAt(0).toUpperCase() + name.slice(1) },
    });

    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in createBarbers", error);
  }
};

//_____________________________________________________________

const getBarbers = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in getBarbers", error);
  }
};

//_____________________________________________________________

const getBarbersId = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in getBarbersId", error);
  }
};

//_____________________________________________________________

const editBarbers = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in editBarbers", error);
  }
};

//_____________________________________________________________

const deleteBarbers = async (req, res) => {
  try {
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
