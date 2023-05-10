const server = require("./app.js");
const { conn } = require("./database.js");
require("dotenv").config();

const port = process.env.PORT || 3001;

conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
});
