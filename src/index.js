const server = require("./app.js");
const { createBarbers } = require("./controllers/barbers.controllers.js");
const { conn } = require("./database.js");
require("dotenv").config();

const port = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  server.listen(port, async () => {
    await createBarbers({ body: { name: "Edgar" } });
    await createBarbers({ body: { name: "Jere" } });
    await createBarbers({ body: { name: "Adriano" } });
    console.log(`Server listening on port: ${port}`);
  });
});
