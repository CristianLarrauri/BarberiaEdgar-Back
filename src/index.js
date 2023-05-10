const server = require("./app.js");
const { conn } = require("./database.js");
require("dotenv").config();

const port = process.env.PORT;

conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    preloadAdmin(jsonAdmin);
    preloadCustomers(jsonCustomers);
    preloadServices(jsonServices);
    console.log(`Server listening on port: ${port}`);
  });
});
