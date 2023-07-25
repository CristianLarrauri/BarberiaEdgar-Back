const { Users } = require("../database");

//_____________________________________________________________

const createUsers = async (req, res) => {
  try {
    let { email } = req.body;

    await Users.findOrCreate({
      where: { email },
    });

    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in createUsers", error);
  }
};
//_____________________________________________________________

const getUsers = async (req, res) => {
  try {
    const { email } = req.query;
    let users;

    if (email) {
      users = await Users.findAll({
        where: { email: email },
      });
    } else {
      users = await Users.findAll();
    }

    return res.status(200).send(users);
  } catch (error) {
    console.error("Error in getUsers", error);
    return res.status(500).send("Internal server error.");
  }
};

//_____________________________________________________________

const editUsers = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Users.findOne({ where: { id: email } });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const newBanValue = !user.ban;

    await Users.update({ ban: newBanValue }, { where: { id: email } });

    return res.status(200).send("OK");
  } catch (error) {
    console.error("Error in editUsers", error);
    return res.status(500).send("Internal server error.");
  }
};

module.exports = { createUsers, getUsers, editUsers };
