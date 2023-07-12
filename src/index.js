const { default: axios } = require("axios");
const server = require("./app.js");
const { conn } = require("./database.js");
require("dotenv").config();

const port = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  server.listen(port, async () => {
    try {
      //______________________________________________________________
      // Carga de datos cuando levanta el servidor
      const barbersData = require("./barbers.json");
      for (const barber of barbersData) {
        await axios.post(`http://localhost:${port}/barbers`, barber);
      }

      const servicesData = require("./services.json");
      for (const service of servicesData) {
        await axios.post(`http://localhost:${port}/services`, service);
      }
      //______________________________________________________________

      console.log(`Server listening on port: ${port}`);
    } catch (error) {
      console.error(`Error on port: ${port}`, error);
    }
  });
});
